const express = require('express');
const app = express();
const axios = require('axios');

const db = require("./config.js");
const Notification = require("./notification.js");
const MsgType = require("./constant").MsgType;

const SpanishCountries = ['Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico', 'Uruguay', 'Venezuela', 'Spain'];
const KindConstant = ['text', 'request', 'photo', 'video', 'audio', 'video_call', 'voice_call'];


const server = require('http').createServer(app);
// const port = process.env.PORT || 4000
const port = 4000;
const io = require('socket.io')(server, {
    cors: {
        origins: '*',
    },
    maxHttpBufferSize: 10E7
});

const groupSocket = require('./groupSocket');

db.query(`SET GLOBAL max_allowed_packet=1024*1024*1024`, (error, item) => {
    // db.query(`SHOW VARIABLES LIKE 'max_allowed_packet'`, (error, item) => {
    //     console.log(item);
    // });
});


let user_socketMap = new Map();
let socket_userMap = new Map();

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const onConnection = (socket) => {
    groupSocket(io, socket, user_socketMap, socket_userMap);

    let currentUserId = socket.handshake.query.currentUserId;
    //user table logout flag make false
    console.log('userId:', currentUserId, ' logined');
    db.query(`UPDATE users SET logout = 0 WHERE id=${currentUserId}`, (error, item) => {
        if (error) {
            console.log("Error43:", error);
        }

        console.log('userId:', currentUserId, ' logined successfully');
    });

    user_socketMap.set(currentUserId, socket.id);
    socket_userMap.set(socket.id, currentUserId);

    console.log(user_socketMap);

    socket.on('forward:message', data => {
        console.log(data);
        data.groupType = 1;
        data.msgType = data.forwardKind == 2 ? 'blink' : data.forwardKind == 4 ? 'media' : 'text'; 
        Notification.sendSMS(currentUserId, data.recipient, data);

        if (data.forwardKind == 2) {
            db.query(`SELECT content FROM messages WHERE id=${data.forwardId}`, (error, messageContent) => {
                if (messageContent.length) {
                    db.query(`INSERT INTO photo_galleries(photo, original_thumb, back, blur, blur_price, content, original_content) SELECT original_thumb, original_thumb, back, blur, blur_price, original_content, original_content FROM photo_galleries WHERE id = ${messageContent[0]['content']}`, (error, newPhoto) => {
                        db.query(`SELECT group_id FROM \`groups\` INNER JOIN users_groups ON groups.id=users_groups.group_id WHERE (user_id=${currentUserId} OR user_id=${data.recipient}) AND type=1 GROUP BY group_id HAVING COUNT(group_id)=2`, (error, groupData) => {
                            if (groupData.length) {
                                if (error) throw error;
                                let groupId = groupData[0]['group_id'];
                                console.log('Foward to:', groupId);
                                db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${currentUserId}", "${groupId}", "${newPhoto.insertId}", 2)`, (error, item) => {
                                    if (error) throw error;
                                    // db.query(`UPDATE photo_galleries SET content=${JSON.stringify(contents[0]['content'])} WHERE id=${newPhoto.insertId}`, (error, photo) => {
                                    //     if (error) throw error;
                                    // });
                                    // Notification.sendSMS(currentUserId, data.recipient, 'Blink', groupId);
                                });
                            } else {
                                console.log('There is no connection with him')
                            }
                        });
                    });
                }
            })
        } else if (data.forwardKind == 0) {
            db.query(`SELECT group_id FROM \`groups\` INNER JOIN users_groups ON groups.id=users_groups.group_id WHERE (user_id=${currentUserId} OR user_id=${data.recipient}) AND type=1 GROUP BY group_id HAVING COUNT(group_id)=2`, (error, groupData) => {
                if (error) throw error;
                let groupId = groupData[0]['group_id'];
                db.query(`INSERT INTO messages(content, kind) SELECT content, kind FROM messages WHERE id = ${data.forwardId}`, (error, item) => {
                    db.query(`UPDATE messages SET sender = ${currentUserId}, group_id=${groupId} WHERE id=${item.insertId}`, (error, item) => {
                        if (error) throw error;
                    });
                });
            });
        } else if (data.forwardKind == 4) {
            db.query(`SELECT content FROM messages WHERE id=${data.forwardId}`, (error, messageContent) => {
                if (messageContent.length) {
                    db.query(`SELECT group_id FROM \`groups\` INNER JOIN users_groups ON groups.id=users_groups.group_id WHERE (user_id=${currentUserId} OR user_id=${data.recipient}) AND type=1 GROUP BY group_id HAVING COUNT(group_id)=2`, (error, groupData) => {
                        if (groupData.length) {
                            if (error) throw error;
                            let groupId = groupData[0]['group_id'];
                            console.log('Foward to:', groupId);
                            db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${currentUserId}", "${groupId}", "${messageContent[0]['content']}", 4)`, (error, item) => {
                                if (error) throw error;
                                // db.query(`UPDATE photo_galleries SET content=${JSON.stringify(contents[0]['content'])} WHERE id=${newPhoto.insertId}`, (error, photo) => {
                                //     if (error) throw error;
                                // });
                                // Notification.sendSMS(currentUserId, data.recipient, 'Blink', groupId);
                            });
                        } else {
                            console.log('There is no connection with him')
                        }
                    });

                }
            })
        }
    });

    socket.on('arrive:message', data => {
        db.query(`UPDATE messages SET state = 2 WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
            let senderSocketId = user_socketMap.get(data.from.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('arrive:message', data);
                }
            }
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('arrive:message', data);
                }
            }
        })
    });

    socket.on('read:message', data => {
        db.query(`UPDATE messages SET state = 3 WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
            let senderSocketId = user_socketMap.get(data.from.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('read:message', data);
                }
            }
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('read:message', data);
                }
            }
        })
    });

    socket.on('send:request', data => {
        if (data.to) {
            let message = {
                from: currentUserId,
                ...data,
                content: data.price,
                kind: 1,
            }
            db.query(`INSERT INTO photo_requests (\`from\`, \`to\`, title, description, price) VALUES ("${currentUserId}", "${data.to}", "${data.title}", "${data.description}", "${data.price}")`, (error, requestItem) => {
                message.requestId = requestItem.insertId;
                db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${currentUserId}", "${data.to}", "${message.requestId}", 1)`, (error, messageItem) => {
                    message.messageId = messageItem.insertId;
                    let recipientSocketId = user_socketMap.get(data.to.toString());
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    io.sockets.sockets.get(senderSocketId).emit('message', message);
                    io.sockets.sockets.get(senderSocketId).emit('receive:request', message);
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('message', message);
                            io.sockets.sockets.get(recipientSocketId).emit('receive:request', message);
                        }
                    }
                });
            });
        }
    });

    socket.on('send:state', data => {
        // console.log(data);
    });

    socket.on('edit:photo', data => {
        db.query(`UPDATE photo_galleries SET photo=${JSON.stringify(data.photo)}, content=${JSON.stringify(data.content)} WHERE id=${data.photoId}`, (error, item) => {
            // if (error) throw error;
            console.log(item);
        });
    });

    socket.on('update:cast', data => {
        let senderSocketId = user_socketMap.get(currentUserId.toString());

        db.query(`UPDATE casts SET cast_title = "${data.newCastTitle}", recipients="${data.newRecipients}" WHERE sender=${currentUserId} AND cast_title="${data.oldCastTitle}"`, (error, item) => {
            if (error) throw error;

            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('update:cast', data);
                }
            }
        });
    });

    socket.on('give:rate', data => {
        console.log(data);
        db.query(`SELECT * FROM messages WHERE id=${data.messageId}`, (err, messageInfo) => {
            if (err) throw err;
            if (messageInfo.length) {
                db.query(`SELECT * FROM rates WHERE user_id=${currentUserId} AND message_id=${data.messageId}`, (err, row) => {
                    if (err) throw err;
                    if (row.length) {
                        db.query(`UPDATE rates SET rate = ${data.rate} WHERE user_id=${currentUserId} AND message_id=${data.messageId}`, (error, item) => {
                            console.log('Update Rate');
                        });
                    } else {
                        db.query(`INSERT INTO rates (user_id, message_id, rate) VALUES (${currentUserId}, ${data.messageId}, ${data.rate})`, (error, item) => {
                            console.log('Insert Rate');
                        });
                    }
                });
                let sender = messageInfo[0].sender;
                let recipientSocketId = user_socketMap.get(sender.toString());
                if (recipientSocketId) {
                    if (io.sockets.sockets.get(recipientSocketId)) {
                        io.sockets.sockets.get(recipientSocketId).emit('get:rate', data);
                    }
                }
                Notification.sendRateSMS(currentUserId, sender, data.rate, data.kind);
            } else {
                console.log('There is no message. ', data);
            }
        });
    })

    socket.on('typing', data => {
        data.globalGroupUsers.split(',').forEach(userId => {
            let recipientSocketId = user_socketMap.get(userId.toString());
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('receive:typing', data);
                }
            }
        })
    });

    socket.on('delete:message', data => {
        let senderSocketId = user_socketMap.get(currentUserId.toString());
        if (data.photoId) {
            console.log(data.photoId);
            db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, photo) => {
                if (photo[0].paid) {
                    io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: false });
                } else {
                    var paid_status = false;
                    // db.query(`DELETE FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
                    //     if (!error) console.log(data.photoId, ': photo deleted')
                    // });
                    db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                        if (!error) {
                            db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                                row.forEach(item => {
                                    let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                                    if (recipientSocketId && io.sockets.sockets.get(recipientSocketId)) {
                                        io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                                    }
                                })
                            });
                        }
                    });
                }
            });
        } else {
            db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                if (!error) {
                    db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                        row.forEach(item => {
                            let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                            if (recipientSocketId && io.sockets.sockets.get(recipientSocketId)) {
                                io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                            }
                        })
                    });
                }
            });
            // db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
            //     if (!error) {
            //         io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: true });
            //         if (io.sockets.sockets.get(recipientSocketId)) {
            //             io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
            //         }
            //     }
            // });
        }
    });

    socket.on('pay:blink', (data, callback) => {
        db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
            data.selectedEmojis.forEach(id => {
                let content = JSON.parse(item[0].content);
                if (id == 'blur') {
                    item[0].blur_payers_list = item[0].blur_payers_list ? item[0].blur_payers_list + ',' + currentUserId : currentUserId;
                } else {
                    let index = content.findIndex(emojiInfo => emojiInfo.id == id);
                    if (content[index].price > 0) {
                        content[index].payersList.push(+currentUserId);
                    }
                    item[0].content = JSON.stringify(content);
                }
                console.log('-----item[0].blur_payers_list-----');
                console.log(item[0].blur_payers_list);
            });
            db.query(`UPDATE photo_galleries SET blur_payers_list=${JSON.stringify(item[0].blur_payers_list || '')}, content=${JSON.stringify(JSON.stringify(JSON.parse(item[0].content)))}, paid=1 WHERE id=${item[0].id}`, (error, photo) => {
                if (error) throw error;
                db.query(`SELECT sender FROM messages WHERE content=${item[0].id} AND kind=2`, (error, messageItem) => {
                    if (error) throw error;
                    if (messageItem.length) {
                        let photoSender = messageItem[0]['sender'];

                        db.query(`UPDATE users SET balances=balances+${data.addBalance} WHERE id=${photoSender}`, (error, item) => {
                            if (error) throw error;
                        });
                        db.query(`UPDATE users SET balances=balances-${data.totalPrice} WHERE id=${currentUserId}`, (error, item) => {
                            if (error) throw error;
                        });
                        db.query(`INSERT INTO payment_histories (sender, recipient, amount) VALUES (${currentUserId}, ${photoSender}, ${data.totalPrice})`, (error, historyItem) => {
                            if (error) throw error;
                            console.log('OK');
                        });
                        Notification.sendPaySMS(currentUserId, photoSender, data.addBalance);
                        callback({
                            status: 'OK'
                        })
                    }
                });
            });
        });
    });

    socket.on('update:thumbnailPhoto', data => {
        db.query(`UPDATE photo_galleries SET photo=${JSON.stringify(data.thumbnailPhoto)} WHERE id=${data.photoId}`, (error, photo) => {
            if (error) throw error;
        });
    });

    socket.on('send:notification', data => {
        Notification.sendSMS(data.sender, data.recipient, data);
    });

    socket.on('send:mediaNotification', data => {
        db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.group_id}"`, (error, row) => {
            console.log('groupUsers:', row);
            row.filter(item => item['user_id'] != data.sender).forEach(item => {
                console.log(user_socketMap)
                console.log(item['user_id'])
                data.msgType = 'media';
                let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                if (recipientSocketId) {
                    if (io.sockets.sockets.get(recipientSocketId)) {
                        io.sockets.sockets.get(recipientSocketId).emit('get:mediaMessage', data);
                    }
                } else {
                    Notification.sendSMS(data.sender, item['user_id'], data);
                }
            })
        });
    });

    socket.on('stickyToFree', data => {
        db.query(`SELECT * FROM messages WHERE content=${data.photoId} AND kind=2`, (err, message) => {
            if (message[0].sender == currentUserId) {
                db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
                    let content = JSON.parse(item[0].content);
                    let index = content.findIndex(emojiInfo => emojiInfo.id == data.emojiId);
                    console.log(content[index]);
                    console.log(content[index].payersList.length);
                    if (content[index].price && !content[index].payersList.length) {
                        // if (content[index].price && !content[index].paid) {
                        content[index].oldPrice = content[index].price;
                        content[index].price = 0;
                    } else if (content[index].price == 0 && !content[index].payersList.length && content[index].oldPrice) {
                        content[index].price = content[index].oldPrice;
                    }
                    item[0].content = JSON.stringify(content);
                    db.query(`UPDATE photo_galleries SET content=${JSON.stringify(item[0].content)} WHERE id=${item[0].id}`, (error, photo) => {
                        if (error) throw error;
                        db.query(`SELECT user_id FROM users_groups WHERE group_id="${message[0].group_id}"`, (error, row) => {
                            row.forEach(item => {
                                let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                                if (recipientSocketId) {
                                    if (io.sockets.sockets.get(recipientSocketId)) {
                                        io.sockets.sockets.get(recipientSocketId).emit('stickyToFree');
                                    }
                                } else {
                                    console.log('No socket SMS')
                                    // this.sendSMS(data.sender, item['user_id'], data);
                                }
                            })
                        });
                    })
                });
            }
        });

    });

    socket.on('test:SMS', data => {
        db.query(`SELECT * FROM countries where iso_code2 = '${data.isoCode2}'`, (error, country) => {
            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
            if (data.dialCode != 1) {
                var fullPhoneNumber = '011' + data.phoneNumber.replace(/[^0-9]/g, '');
            } else {
                var fullPhoneNumber = data.phoneNumber.replace(/[^0-9]/g, '');
            }
            if (spainish) {
                var message = `Oye, tu numero de movil ${data.phoneNumber} ha sido actualizado en OJO.`;
            } else {
                var message = `Hey, your mobile number ${data.phoneNumber} has been updated at OJO.`;
            }
            if (data.type == 1) {
                var smsUrl = `https://gws.bouncesms.com/index.php?app=ws&u=Ojo&h=c7a2e80af90d748ac150608128af3579&op=pv&to=${fullPhoneNumber}&msg=${message}`

            } else {
                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
            }
            axios.get(smsUrl).then(res => {
                if (res.status == 200) {
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    if (senderSocketId) {
                        if (io.sockets.sockets.get(senderSocketId)) {
                            io.sockets.sockets.get(senderSocketId).emit('test:SMS', { type: data.type });
                        }
                    }
                } else {
                    console.log('Error');
                }
            }).catch(error => {
                console.log(error);
            });

        });
    });

    socket.on('logout', data => {
        let userSocketId = user_socketMap.get(currentUserId.toString());
        user_socketMap.delete(currentUserId);
        socket_userMap.delete(userSocketId);
        console.log('userId:', currentUserId, ' logouted');
        console.log(user_socketMap);
    });

    socket.on('disconnect', function () {
        // Do stuff (probably some jQuery)
        user_socketMap.delete(currentUserId);
        socket_userMap.delete(socket.id);
        console.log(currentUserId, " : ", socket.id, ' Disconnected')
        console.log(user_socketMap);
    });
}

io.on('connection', onConnection);

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
