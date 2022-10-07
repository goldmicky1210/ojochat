const db = require("./config.js");
const SpanishCountries = require("./constant").SpanishCountries;
const KindConstant = require("./constant").KindConstant;
const axios = require('axios');

exports.sendPaySMS = (sender, recipient, amount) => {
    db.query(`SELECT * FROM users where id = ${recipient}`, (error, row) => {
        if (row.length) {
            if (row[0].notification) {
                // var val = Math.floor(100000 + Math.random() * 900000);
                let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                let isoCode2 = row[0].national.toUpperCase();
                db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {
                    db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                        let phone_code = phoneInfo[0].phone_code;
                        let fullPhoneNumber = '';
                        if (phone_code != 1) {
                            fullPhoneNumber = '011' + phoneNumber;
                        } else {
                            fullPhoneNumber = phoneNumber;
                        }
                        db.query(`SELECT * FROM users where id=${sender}`, (error, user) => {
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            if (spainish) {
                                // var message = `Hola ${row[0].username}, you have got cash! You have received $${amount} from ${user[0].username} on OJO.`;
                                var message = `Hola, ${row[0].username}, tienes efectivo!  Has recibido $${amount} de ${user[0].username} en OJO.`;
                            } else {
                                var message = `Hey ${row[0].username}, you\u0027ve got cash! You have received $${amount} from ${user[0].username} on OJO.`;
                            }
                            this.sendSMSFinal(fullPhoneNumber, message, row[0].sms_type);
                        });
                    });
                });
            }
        }
    });
}

exports.sendRateSMS = (sender, recipient, rate, kindIndex) => {
    db.query(`SELECT * FROM users where id = ${recipient}`, (error, row) => {
        if (row.length) {
            if (row[0].notification) {
                // var val = Math.floor(100000 + Math.random() * 900000);
                let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                let isoCode2 = row[0].national.toUpperCase();
                db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {
                    db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                        let phone_code = phoneInfo[0].phone_code;
                        let fullPhoneNumber = '';
                        if (phone_code != 1) {
                            fullPhoneNumber = '011' + phoneNumber;
                        } else {
                            fullPhoneNumber = phoneNumber;
                        }
                        db.query(`SELECT * FROM users where id=${sender}`, (error, user) => {
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            let countStar = '';
                            for (let i = 0; i < rate; i++) {
                                countStar += '*';
                                // countStar += '\u2B50';
                                // countStar += '⭐️⭐️⭐️⭐️⭐️';
                            }
                            let type = KindConstant[kindIndex];
                            let messageType = type == 'text' ? 'un mensaje de texto' : type == 'blink' ? 'blink' : type == 'media' ? 'media' : 'solicitar';
                            if (spainish) {
                                var message = `Hola ${row[0].username}, ${user[0].username} acaba de darte ${countStar} en ${messageType} en OJO.`;
                            } else {
                                var message = `Hey ${row[0].username}, ${user[0].username} just rated you ${countStar} on a ${type} message at OJO.`;
                            }
                            this.sendSMSFinal(fullPhoneNumber, message, row[0].sms_type);
                        });
                    });
                });
            }
        }
    });
}


exports.sendSMSFinal = (phoneNumber, message, smsType) => {
    if (smsType == 1) {
        var smsUrl = `https://gws.bouncesms.com/index.php?app=ws&u=Ojo&h=c7a2e80af90d748ac150608128af3579&op=pv&to=${phoneNumber}&msg=${message}`;
    } else {
        var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${phoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
    }
    axios.get(smsUrl).then(res => {
        console.log("Sent SMS");
    }).catch(error => {
        console.log(error);
    });
}

exports.sendSMS = (sender, recipient, data) => {
    console.log(data);
    if (sender != recipient) {
        db.query(`SELECT * FROM users WHERE id = ${recipient}`, (error, row) => {
            if (row.length) {
                if (row[0].notification) {
                    var val = Math.floor(100000 + Math.random() * 900000);
                    let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                    let isoCode2 = row[0].national.toUpperCase();
                    db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {
                        db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                            let phone_code = phoneInfo[0].phone_code
                            let fullPhoneNumber = '';
                            if (phone_code != 1) {
                                fullPhoneNumber = '011' + phoneNumber;
                            } else {
                                fullPhoneNumber = phoneNumber;
                            }
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            let message = '';

                            db.query(`SELECT title, type FROM \`groups\` WHERE id=${data.globalGroupId || data.group_id}`, (error, groupInfo) => {
                                if (groupInfo && groupInfo.length) {
                                    let groupType = data.groupType;

                                    let messageType = data.msgType == 'text' ? 'de texto' : data.msgType == 'blink' ? 'Blink' : 'solicitar';
                                    if (groupType == 1 || groupType == 3) {
                                        // Direct and Cast Message
                                        if (spainish) {
                                            message = `Hola ${row[0].username}, tienes un nuevo ${messageType} de ${data.senderName}. Inicie sesion en Ojochat para ver sus mensajes. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, you have a new ${data.msgType == 'text' ? 'text message' : 'Blink'} from ${data.senderName || 'Someone'}. Login to Ojochat.com to view your messages. ${val}`;
                                        }
                                    } else if (groupType == 2) {
                                        // Group Message
                                        if (spainish) {
                                            message = `Hola ${row[0].username}, ${data.senderName} ha publicado un nuevo ${messageType} en el grupo ${groupInfo[0]['title']}. Inicie sesión en Ojochat para ver nuevos mensajes de grupo. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, a new ${data.msgType == 'text' ? 'text message' : 'Blink'} has been posted by ${data.senderName} in the group ${groupInfo[0]['title']}. Login to Ojochat.com to view new group messages. ${val}`;
                                        }
                                    }
                                }
                                if (data.msgType == 'inviteGroupUser') {
                                    // Invite Message
                                    if (spainish) {
                                        message = `Hola ${row[0].username}, Has sido invitado por ${data.senderName} en el grupo ${groupInfo[0]['title']}. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, You have been invited by ${data.senderName} to the group ${groupInfo[0]['title']}. Log onto Ojochat to accept. ${val}`;
                                    }
                                } else if (data.msgType == 'addGroupAdmin') {
                                    // Add admin user Message
                                    if (spainish) {
                                        message = `Hola ${row[0].username}, ${data.senderName} te ha invitado al grupo ${groupInfo[0]['title']}. Inicie sesión en Ojochat para aceptar. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, You have become an admin of the group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                    }
                                } else if (data.msgType == 'removeGroupUser') {
                                    // Remove use from group
                                    if (spainish) {
                                        message = `Hey ${row[0].username}, You have removed from group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, You have removed from group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                    }
                                } else if (data.msgType == 'media') {
                                    if (spainish) {
                                        message = `Hola ${row[0].username}, tienes un nuevo mensaje multimedia de ${data.senderName}.  Inicie sesión en Ojochat para ver sus mensajes. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, You have a new media message from ${data.senderName}. Login to Ojochat.com to view your messages ${val}`
                                    }
                                } else if (data.msgType == 'editBlink') {
                                    if (spainish) {
                                        message = `Hola ${row[0].username}, ${data.senderName} ha editado un Blink. Inicie sesión en Ojochat para ver sus mensajes. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, a Blink has been edited by ${data.senderName}. Login to Ojochat.com to view your messages. ${val}`;
                                    }
                                } else if (data.msgType == 'thanks') {
                                    if (spainish) {
                                        message = `Hola ${row[0].username}, Thanks for your payment. ${val}`;
                                    } else {
                                        message = `Hey ${row[0].username}, Thanks for your payment. ${val}`;
                                    }
                                }
                                console.log('message=', message);
                                console.log(fullPhoneNumber);
                                if (fullPhoneNumber && message) {
                                    this.sendSMSFinal(fullPhoneNumber, message, row[0]['sms_type']);
                                }
                            });
                        });
                    });
                }
            }
        });
    }
}

exports.sendMessage = (sender, groupId, data, user_socketMap, io) => {
    data.groupId = groupId;
    db.query(`SELECT user_id FROM users_groups WHERE group_id="${groupId}"`, (error, row) => {
        row.forEach(item => {
            let recipientSocketId = user_socketMap.get(item['user_id'].toString());
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('send:groupMessage', data);
                }
            } else {
                console.log('No socket SMS')
                this.sendSMS(data.sender, item['user_id'], data);
            }
        })
    });
}

exports.sendGroupSMS = (sender, groupId, data, user_socketMap, io) => {
    data.globalGroupId = groupId;
    db.query(`SELECT user_id FROM users_groups WHERE group_id="${groupId}"`, (error, row) => {
        row.forEach(item => {
            this.sendSMS(sender, item['user_id'], data);
        });
    });
}
