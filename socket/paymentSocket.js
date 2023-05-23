const db = require("./config");
const Notification = require("./notification.js");
const fs = require('fs')
const { Blob } = require('blob-polyfill');

module.exports = (io, socket, user_socketMap, socket_userMap) => {
    let currentUserId = socket.handshake.query.currentUserId;

    socket.on('add:balance', (data, callback) => {
        db.query(`UPDATE users SET balances=balances+${data.amount} WHERE id=${currentUserId}`, (error, item) => {
            if (error) throw error;
            callback({ status: 'OK', amount: data.amount })
        });
    });

    socket.on('send:sendWithdrawRequest', (data, callback) => {
        console.log(data);
        data.kind = 0;
        data.msgType = 'sendWithdrawRequest';
        db.query(`SELECT * FROM users WHERE username='$OJOCHAT'`, (error, item) => {
            if (error) throw error;
            if (item.length) {
                Notification.sendSMS(currentUserId, item[0].id, data);
            }
        })
    });

    socket.on('send:acceptWithdrawRequest', (data, callback) => {
        console.log(data);
        data.kind = 0;
        data.msgType = 'acceptWithdrawRequest';
        db.query(`UPDATE withdraws SET status='success' WHERE id=${data.withdrawId}`, (error, item) => {
            if (error) throw error;
            Notification.sendSMS(currentUserId, data.userId, data);
            // callback({ status: 'OK', amount: data.amount })
        });
    });

    socket.on('send:rejectWithdrawRequest', (data, callback) => {
        console.log(data);
        data.kind = 0;
        data.msgType = 'rejectWithdrawRequest';
        db.query(`UPDATE withdraws SET status='failed' WHERE id=${data.withdrawId}`, (error, item) => {
            if (error) throw error;
            // Notification.sendSMS(currentUserId, data.userId, data);
            callback({ status: 'OK' })
        });
    });

    
}