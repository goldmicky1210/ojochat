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
                                // countStar += '??????????????????????????????';
                            }
                            let type = KindConstant[kindIndex];
                            let messageType = type == 'text' ? 'un mensaje de texto' : type == 'photo' ? 'una foto' : 'solicitar';
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
    console.log(phoneNumber);
    console.log(message);
    console.log(smsType);
    if (smsType == 1) {
        var smsUrl = `https://gws.bouncesms.com/index.php?app=ws&u=ojo&h=8626eda4876ce9a63a564b8b28418abd&op=pv&to=${phoneNumber}&msg=${message}`;
    } else {
        var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${phoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
    }
    axios.get(smsUrl).then(res => {
        console.log("Status: ", res.data);
    }).catch(error => {
        console.log(error);
    });
}

exports.sendSMS = (sender, recipient, data) => {
    
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

                            db.query(`SELECT title, type FROM \`groups\` WHERE id=${data.globalGroupId}`, (error, groupInfo) => {
                                if (groupInfo.length) {
                                    let groupType = data.groupType;
                                
                                    let messageType = data.msgType == 0 ? 'de texto' : data.msgType == 2 ? 'Blink' : 'solicitar';
                                    if (groupType == 1 || groupType == 3) {
                                        // Direct and Cast Message
                                        if (spainish) {
                                            message = `Hola ${row[0].username}, tienes un nuevo ${messageType} de ${data.senderName}. Inicie sesion en Ojochat.com para ver sus mensajes. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, you have a new ${data.msgType == 0 ? 'text message' : 'Blink'} from ${data.senderName || 'Someone'}. Login to Ojochat.com to view your messages. ${val}`;
                                        }
                                    } else if (groupType == 2 && data.msgType != 0) {
                                        // Group Message
                                        if (spainish) {
                                            // 'Hola, Keelan, NAME ha publicado un nuevo Blink en el grupo Beta.  Inicie sesi??n en Ojochat.com para ver nuevos mensajes de grupo.'
                                            message = `Hola ${row[0].username}, ${data.senderName} ha publicado un nuevo ${messageType} en el grupo ${groupInfo[0]['title']}. Inicie sesi??n en Ojochat.com para ver nuevos mensajes de grupo. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, a new ${data.msgType == 0 ? 'text message' : 'Blink'} has been posted by ${data.senderName} in the group ${groupInfo[0]['title']}. Login to Ojochat.com to view new group messages. ${val}`;
                                        }
                                    } else if (data.msgType == 3) {
                                        // Invite Message
                                        if (spainish) {
                                            message = `Hola ${row[0].username}, Has sido invitado por ${data.senderName} en el grupo ${groupInfo[0]['title']}. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, You have been invited by ${data.senderName} to the group ${groupInfo[0]['title']}. Log onto Ojochat to accept. ${val}`;
                                        }
                                    } else if (data.msgType == 4) {
                                        // Add admin user Message
                                        if (spainish) {
                                            message = `Hola ${row[0].username}, ${data.senderName} te ha invitado al grupo ${groupInfo[0]['title']}. Inicie sesi??n en Ojochat para aceptar. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, You have become an admin of the group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                        }
                                    } else if (data.msgType == 5) {
                                        // Remove use from group
                                        if (spainish) {
                                            message = `Hey ${row[0].username}, You have removed from group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                        } else {
                                            message = `Hey ${row[0].username}, You have removed from group ${groupInfo[0]['title']} by ${data.senderName}. ${val}`;
                                        }
                                    }
                                    if (fullPhoneNumber && message) {
                                        this.sendSMSFinal(fullPhoneNumber, message, row[0]['sms_type']);
                                    }
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
    })
}
