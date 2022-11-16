const db = require("./config");
const Notification = require("./notification.js");

module.exports = (io, socket, user_socketMap, socket_userMap) => {
    let currentUserId = socket.handshake.query.currentUserId;

    socket.on('create:group', data => {
        db.query(`INSERT INTO \`groups\` (title, type, owner, description, fee_type, fee_value, admins, avatar) VALUES ("${data.title}", ${data.type}, ${currentUserId}, "${data.description || ''}", ${data.feeType || 0}, ${data.feeValue || 0}, ${currentUserId}, ${JSON.stringify(data.avatar) || null})`, (error, item) => {
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
                data.msgType = 'text';
                Notification.sendMessage(currentUserId, data.globalGroupId, data, user_socketMap, io);
            });
        }

        if (data.groupType == 3) {
            console.log('===================');
            console.log(data.globalGroupUsers);
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

    socket.on('send:thanksMessage', (data, callback) => {
        console.log(data);
        data.sender = currentUserId;
        data.content = "Thanks for your payment.";
        data.kind = 0;
        data.msgType = 'thanks';
        db.query(`UPDATE payment_histories SET thanks=1 WHERE id=${data.paymentId}`, (error, data) => {
            callback({ status: 'OK' })
        });
        db.query(`SELECT group_id
                    FROM \`groups\` 
                    INNER JOIN users_groups 
                    ON groups.id = users_groups.group_id
                    WHERE (user_id = ${data.userId} OR user_id = ${data.sender})
                    AND TYPE=1
                    GROUP BY group_id
                    HAVING COUNT(group_id) = 2`,

            (error, result) => {
                if (error) throw error;
                if (result.length) {
                    db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${currentUserId}", "${result[0]['group_id']}", "${data.content}")`, (error, item) => {
                        Notification.sendMessage(currentUserId, result[0]['group_id'], data, user_socketMap, io);
                    });
                } else {
                    db.query(`INSERT INTO \`groups\` (title, owner, admins) VALUES ("${data.senderName}", ${data.sender}, ${data.sender})`, (error, group) => {
                        if (error) throw error;
                        let groupId = group.insertId;

                        db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.sender}, ${groupId}, 2), (${recipientId}, ${groupId}, 2)`, (error, item) => {
                            db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${data.sender}", "${groupId}", "${data.content}")`, (error, item) => {
                                console.log('You created new group');
                                Notification.sendMessage(currentUserId, groupId, data, user_socketMap, io);
                            });
                        });
                    });
                }
            });
    });

    socket.on('send:groupBlink', async (data) => {

        db.query(`INSERT INTO photo_galleries (photo, original_thumb, back, blur, blur_price, content, original_content) VALUES (${JSON.stringify(data.photo)}, ${JSON.stringify(data.photo)}, ${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice}, ${JSON.stringify(data.content)}, ${JSON.stringify(data.content)})`, async (error, item) => {
            data.id = item.insertId;
            data.photoId = item.insertId;
            data.content = data.photo;
            data.kind = 2;
            data.msgType = 'blink';
            db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${data.sender}", "${data.globalGroupId}", "${data.id}", 2)`, (error, messageItem) => {
                data.messageId = messageItem.insertId;
                Notification.sendMessage(currentUserId, data.globalGroupId, data, user_socketMap, io);
            });
        });

        if (data.groupType == 3) {
            let groupUsers = data.globalGroupUsers ? data.globalGroupUsers.split(',') : []
            for (const recipientId of groupUsers) {
                if (recipientId != currentUserId) {
                    let tempData = JSON.parse(JSON.stringify(data));
                    db.query(`INSERT INTO photo_galleries (photo, original_thumb, back, blur, blur_price, content, original_content) VALUES (${JSON.stringify(tempData.photo)}, ${JSON.stringify(tempData.photo)}, ${JSON.stringify(tempData.back)}, ${tempData.blur}, ${tempData.blurPrice}, ${JSON.stringify(tempData.content)}, ${JSON.stringify(tempData.content)})`, (error, item) => {
                        tempData.id = item.insertId;
                        tempData.photoId = item.insertId;
                        tempData.content = tempData.photo;
                        tempData.kind = 2;
                        tempData.msgType = 'blink';
                        db.query(`SELECT group_id
                                    FROM \`groups\` 
                                    INNER JOIN users_groups 
                                    ON groups.id = users_groups.group_id
                                    WHERE (user_id = ${recipientId} OR user_id = ${tempData.sender})
                                    AND TYPE=1
                                    GROUP BY group_id
                                    HAVING COUNT(group_id) = 2`,

                            (error, result) => {
                                if (error) throw error;
                                if (result.length) {
                                    db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${currentUserId}", "${result[0]['group_id']}", "${tempData.id}", 2)`, (error, item) => {
                                    });
                                } else {
                                    db.query(`INSERT INTO \`groups\` (title, owner, admins) VALUES ("${tempData.senderName}", ${tempData.sender}, ${tempData.sender})`, (error, group) => {
                                        if (error) throw error;
                                        let groupId = group.insertId;

                                        db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${tempData.sender}, ${groupId}, 2), (${recipientId}, ${groupId}, 2)`, function (error, item) {
                                            db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${tempData.sender}", "${groupId}", "${tempData.id}", 2)`, (error, item) => {
                                                console.log('You created new group');
                                            });
                                        });
                                    });
                                }
                            });
                    });
                }

            }
        }
    });
    socket.on('save:blink', (data, callback) => {

        db.query(`INSERT INTO photo_galleries (photo, back, blur, blur_price, content, created_by) VALUES (${JSON.stringify(data.photo)}, ${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice}, ${JSON.stringify(data.content)}, ${data.sender})`, (error, item) => {
            data.id = item.insertId;
            callback({
                status: 'OK'
            })
        });
    });

    socket.on('leave:group', data => {
        let { currentGroupId, currentGroupUsers, currentUserId } = data;
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
        db.query(`DELETE FROM users_groups WHERE group_id=${data.groupId}`, (error, item) => {
            data.groupUsers.split(',').forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${data.groupId}, 2)`, (error, item) => {
                    callback({
                        status: 'OK'
                    })
                });
            });
        });
    });

    socket.on('edit:groupProfile', (data, callback) => {
        let { groupId, groupTitle, groupDescription, groupFeeType, groupFeeValue, groupAvatar } = data;
        db.query(`UPDATE \`groups\` SET title="${groupTitle}", description="${groupDescription}" ${groupFeeType ? ', fee_type=' + groupFeeType : ''} ${groupFeeValue ? ', fee_value=' + groupFeeValue : ''}  ${groupAvatar ? ', avatar="' + groupAvatar + '"' : ""} WHERE id=${groupId}`, (error, item) => {
            if (error) throw error;
            callback({
                status: 'OK'
            });
        });
    });

    socket.on('add:pendingGroupUser', (data, callback) => {
        db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.currentUserId}, ${data.currentGroupId}, 1) ON DUPLICATE KEY UPDATE user_id=${data.currentUserId}, group_id=${data.currentGroupId}, status=1`, (error, item) => {
            callback({ status: 'OK' });
        });
    });

    socket.on('invite:groupUsers', (data, callback) => {
        db.query(`SELECT id FROM \`groups\` WHERE id=${data.currentGroupId}`, (error, result) => {
            if (error) throw error;
            if (result.length) {
                data.sender = currentUserId;
                let messageData = {
                    globalGroupId: data.currentGroupId,
                    msgType: 'inviteGroupUser',
                    senderName: data.senderName
                }
                data.groupUsers.split(',').forEach(userId => {
                    Notification.sendSMS(currentUserId, userId, messageData);
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
            }
        })
    });

    socket.on('join:group', (data, callback) => {
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
                                if (group[0].fee_value > 0) {
                                    db.query(`INSERT INTO payment_histories (sender, recipient, amount, refer_id, type) VALUES (${currentUserId}, ${group[0].owner}, ${group[0].fee_value}, ${group[0].id}, 1)`, (error, historyItem) => {
                                        if (error) throw error;
                                        console.log('You paid successfully');
                                    });
                                    db.query(`UPDATE users SET balances=balances+${group[0].fee_value * 0.7} WHERE id=${group[0].owner}`, (error, item) => {
                                    });
                                    setExpireDate(currentUserId, data.currentGroupId);
                                    Notification.sendPaySMS(currentUserId, group[0].owner, group[0].fee_value * 0.7);
                                }
                                callback({ status: 'OK' });
                            });
                        });
                    }
                });
            }
        });
    });

    socket.on('add:groupAdmin', (data, callback) => {
        db.query(`UPDATE \`groups\` SET admins="${data.admins}" WHERE id=${data.globalGroupId}`, (error, item) => {
            if (error) throw error;
            data.msgType = 'addGroupAdmin';
            Notification.sendSMS(currentUserId, data.addId, data);
            callback({ status: 'OK' });
        });
    });

    socket.on('remove:groupUser', (data, callback) => {
        db.query(`DELETE from users_groups WHERE user_id=${data.removeId} AND group_id=${data.globalGroupId}`, (error, item) => {
            if (error) throw error;
            db.query(`UPDATE \`groups\` SET admins="${data.admins}" WHERE id=${data.globalGroupId}`, (error, item) => {
                if (error) throw error;
            });
            data.msgType = 'removeGroupUser';
            Notification.sendSMS(currentUserId, data.removeId, data);
            callback({ status: 'OK' });
        });
    });

    socket.on('check:expireDate', (data, callback) => {
        db.query(`SELECT * from users_groups WHERE user_id=${data.userId} AND group_id=${data.groupId}`, (err, result) => {
            if (err) throw err;
            if (result[0].expire_date && result[0].expire_date < new Date()) {
                db.query(`SELECT * from users WHERE id=${data.userId}`, (err, user) => {
                    db.query(`SELECT * from \`groups\` WHERE id=${data.groupId}`, (error, group) => {
                        if (user[0].balances < group[0].fee_value) {
                            console.log('You expired from this group');
                            db.query(`UPDATE users_groups SET status=1 WHERE user_id=${data.userId} AND group_id=${data.groupId}`, (err, result) => {
                                if (err) throw err;
                                callback({ status: 'expired' });
                            });
                        } else {
                            let balance = user[0].balances - group[0].fee_value;
                            db.query(`UPDATE users SET balances=${balance} WHERE id=${data.userId}`, (error, item) => {
                                if (error) throw error;
                                db.query(`UPDATE users_groups SET status=2 WHERE user_id=${data.userId} AND group_id=${data.groupId}`, (error, item) => {
                                    if (error) throw error;
                                    if (group[0].fee_value > 0) {
                                        db.query(`INSERT INTO payment_histories (sender, recipient, amount, refer_id, type) VALUES (${data.userId}, ${group[0].owner}, ${group[0].fee_value}, ${group[0].id}, 1)`, (error, historyItem) => {
                                            if (error) throw error;
                                            console.log('You paid successfully');
                                        });
                                        db.query(`UPDATE users SET balances=balances+${group[0].fee_value * 0.7} WHERE id=${group[0].owner}`, (error, item) => {
                                            console.log(item);
                                        });
                                        setExpireDate(data.userId, data.groupId);
                                        Notification.sendPaySMS(data.userId, group[0].owner, group[0].fee_value * 0.7);
                                    }
                                });
                            });
                        }
                    });
                });
            } else {
                callback({ status: 'not expired' });
            }
        })
    });

    function setExpireDate(userId, groupId) {
        db.query(`SELECT * FROM \`groups\` WHERE id=${groupId}`, (err, group) => {
            var expireDate = new Date();
            if (group[0].fee_type == 1) {
                expireDate = expireDate.setMonth(expireDate.getMonth() + 1);
            } else if (group[0].fee_type == 2) {
                expireDate = expireDate.setFullYear(expireDate.getFullYear() + 1);
            } else if (group[0].fee_type == 3) {
                expireDate = expireDate.setFullYear(expireDate.getFullYear() + 100);
            }
            console.log(new Date(expireDate).toISOString().slice(0, 10));
            db.query(`UPDATE users_groups SET expire_date="${new Date(expireDate).toISOString().slice(0, 10)}" WHERE user_id = ${userId} AND group_id = ${groupId}`, (err, result) => {
                if (err) throw err;
                console.log(result);
            })
        });
    }
}