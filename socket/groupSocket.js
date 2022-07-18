const { received } = require("laravel-mix/src/Log");
const db = require("./config");
const Notification = require("./notification.js");

module.exports = (io, socket, user_socketMap, socket_userMap) => {
    let currentUserId = socket.handshake.query.currentUserId;

    socket.on('create:group', data => {
        db.query(`INSERT INTO \`groups\` (title, type, owner, admins, avatar) VALUES ("${data.title}", ${data.type}, ${currentUserId}, ${currentUserId}, ${JSON.stringify(data.avatar) || null})`, (error, item) => {
            if (error) throw error;
            data.id = item.insertId;
            data.users.forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${item.insertId}, 2)`, (error, item) => {
                });
            });
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            if (senderSocketId) {
                io.sockets.sockets.get(senderSocketId).emit('create:group', data);
            }
        });
    });

    socket.on('send:groupMessage', data => {
        data.sender = currentUserId;
        if (data.globalGroupId) {
            db.query(`INSERT INTO messages (sender, group_id, content, reply_id, reply_kind) VALUES ("${currentUserId}", "${data.globalGroupId}", "${data.content}", ${data.replyId || 0}, ${data.replyKind || 0})`, (error, item) => {
                data.id = item.insertId;
                data.kind = 0;
                data.msgType = 0;
                Notification.sendMessage(currentUserId, data.globalGroupId, data, user_socketMap, io);
                // db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                //     row.forEach(item => {
                //         let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                //         if (recipientSocketId) {
                //             if (io.sockets.sockets.get(recipientSocketId)) {
                //                 io.sockets.sockets.get(recipientSocketId).emit('send:groupMessage', data);
                //             }
                //         } else {
                //             console.log('Send Message SMS');
                //             Notification.sendSMS(data.sender, item['user_id'], 'text', data.globalGroupId);
                //         }
                //     });
                // });
            });
        }

        if (data.groupType == 3) {
            let groupUsers = data.globalGroupUsers ? data.globalGroupUsers.split(',') : []
            groupUsers.filter(id => id != currentUserId).forEach(recipientId => {
                db.query(`SELECT group_id
                    FROM \`groups\` 
                    INNER JOIN users_groups 
                    ON groups.id = users_groups.group_id
                    WHERE (user_id = ${recipientId} OR user_id = ${data.sender})
                    AND TYPE=1
                    GROUP BY group_id
                    HAVING COUNT(group_id) = 2`,

                    (error, result) => {
                        if (error) throw error;
                        if (result.length) {
                            db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${currentUserId}", "${result[0]['group_id']}", "${data.content}")`, (error, item) => {

                            });
                        } else {
                            db.query(`INSERT INTO \`groups\` (title, owner, admins) VALUES ("${data.senderName}", ${data.sender}, ${data.sender})`, (error, group) => {
                                if (error) throw error;
                                let groupId = group.insertId;

                                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.sender}, ${groupId}, 2), (${recipientId}, ${groupId}, 2)`, (error, item) => {
                                    db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${data.sender}", "${groupId}", "${data.content}")`, (error, item) => {
                                        console.log('You created new group');
                                    });
                                });
                            });
                        }
                    });
            });
        }
    });

    socket.on('send:groupBlink', data => {

        db.query(`INSERT INTO photo_galleries (photo, original_thumb, back, blur, blur_price, content, original_content) VALUES (${JSON.stringify(data.photo)}, ${JSON.stringify(data.photo)}, ${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice}, ${JSON.stringify(data.content)}, ${JSON.stringify(data.content)})`, (error, item) => {
            data.id = item.insertId;
            data.photoId = item.insertId;
            data.content = data.photo;
            data.msgType = 2;
            data.kind = 2;
            db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${data.sender}", "${data.globalGroupId}", "${data.id}", 2)`, (error, messageItem) => {
                data.messageId = messageItem.insertId;
                Notification.sendMessage(currentUserId, data.globalGroupId, data, user_socketMap, io);
            });
        });
    });

    socket.on('leave:group', data => {
        let { currentGroupId, currentGroupUsers } = data;
        currentGroupUsers = currentGroupUsers.split(',').filter(item => item != currentUserId).join(',');

        db.query(`DELETE from users_groups WHERE user_id=${currentUserId} AND group_id=${currentGroupId}`, (error, item) => {
            if (error) throw error;
            socket.emit('leave:group', { state: true });
        });
    });

    socket.on('remove:group', data => {
        db.query(`UPDATE users_groups SET remove_at=CURRENT_TIMESTAMP WHERE user_id=${currentUserId} AND group_id=${data.currentGroupId}`, (error, item) => {
            if (error) throw error;
        })
        socket.emit('remove:group', { state: true });
    });

    socket.on('edit:groupUsers', (data, callback) => {
        db.query(`DELETE FROM users_groups WHERE group_id=${data.currentGroupId}`, (error, item) => {
            data.groupUsers.split(',').forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${data.currentGroupId}, 2)`, (error, item) => {
                    callback({
                        status: 'OK'
                    })
                });
            });
        });
    });

    socket.on('edit:groupProfile', (data, callback) => {
        console.log(data);
        let { groupId, groupTitle, groupDescription, groupFeeType, groupFeeValue, groupAvatar } = data;
        db.query(`UPDATE \`groups\` SET title="${groupTitle}", description="${groupDescription}" ${groupFeeType ? ', fee_type=' + groupFeeType : ''} ${groupFeeValue ? ', fee_value=' + groupFeeValue : ''}  ${groupAvatar ? ', avatar="' + groupAvatar + '"' : ""} WHERE id=${groupId}`, (error, item) => {
            if (error) throw error;
            callback({
                status: 'OK'
            });
        });
    });

    socket.on('add:pendingGroupUser', (data, callback) => {
        // db.query(`DELETE FROM users_groups WHERE group_id=${data.currentGroupId} AND user_id=${data.currentUserId}`, (error, item) => {
        //     db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.currentUserId}, ${data.currentGroupId}, 1)`, (error, item) => {
        //         callback({
        //             status: 'OK'
        //         });
        //     });
        // });
        console.log(data);
        db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.currentUserId}, ${data.currentGroupId}, 1) ON DUPLICATE KEY UPDATE user_id=${data.currentUserId}, group_id=${data.currentGroupId}, status=1`, (error, item) => {
            console.log('--------');
            console.log(item);
            console.log('--------');
            callback({
                status: 'OK'
            });
        });
    });

    socket.on('invite:groupUsers', (data, callback) => {
        console.log(data);
        data.sender = currentUserId;
        let messageData = {
            globalGroupId: data.currentGroupId,
            msgType: 3,
            senderName: data.senderName
        }
        data.groupUsers.split(',').forEach(userId => {
            Notification.sendSMS(currentUserId, userId, messageData);
            // db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${data.currentGroupId}, 1)`, (error, item) => {
            //     console.log(userId, ': pending group user');
            // });
        });
        data.content = data.currentGroupId; 

        data.groupUsers.split(',').forEach(recipientId => {
            db.query(`SELECT group_id
                    FROM \`groups\` 
                    INNER JOIN users_groups 
                    ON groups.id = users_groups.group_id
                    WHERE (user_id = ${recipientId} OR user_id = ${data.sender})
                    AND TYPE=1
                    GROUP BY group_id
                    HAVING COUNT(group_id) = 2`,

                (error, result) => {
                    if (error) throw error;
                    if (result.length) {
                        db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${currentUserId}", "${result[0]['group_id']}", "${data.content}", 3)`, (error, item) => {

                        });
                    } else {
                        db.query(`INSERT INTO \`groups\` (title, owner, admins) VALUES ("${data.senderName}", ${data.sender}, ${data.sender})`, (error, group) => {
                            if (error) throw error;
                            let groupId = group.insertId;

                            db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.sender}, ${groupId}, 2), (${recipientId}, ${groupId}, 2)`, (error, item) => {
                                db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${data.sender}", "${groupId}", "${data.content}", 3)`, (error, item) => {
                                    console.log('You created new group');
                                });
                            });
                        });
                    }
                });
        });
    });

    socket.on('join:group', (data, callback) => {
        console.log(data);
        db.query(`SELECT * from users WHERE id=${currentUserId}`, (error, user) => {
            if (user.length) {
                db.query(`SELECT * from \`groups\` WHERE id=${data.currentGroupId}`, (error, group) => {
                    if (user[0].balances < group[0].fee_value) {
                        callback({ status: 'No enough balance' });
                    } else {
                        let balance = user[0].balances - group[0].fee_value;
                        db.query(`UPDATE users SET balances=${balance} WHERE id=${currentUserId}`, (error, item) => {
                            if (error) throw error;
                            db.query(`UPDATE users_groups SET status=2 WHERE user_id=${currentUserId} AND group_id=${data.currentGroupId}`, (error, item) => {
                                if (error) throw error;
                                callback({
                                    status: 'OK'
                                })
                            });
                        });
                    }
                });
            }
        })
    });

}