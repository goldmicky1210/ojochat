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
        data.kind = 0;
        data.msgType = 'sendWithdrawRequest';
        db.query(`SELECT * FROM users WHERE username='$OJOCHAT'`, (error, item) => {
            if (error) throw error;
            db.query(`INSERT INTO payment_histories (recipient, amount, state, refer_id, type) VALUES (${currentUserId}, ${data.withdrawAmount}, 0, ${data.withdrawId}, 5)`, (error, withdrawItem) => {
                console.log(withdrawItem)
            });
            db.query(`UPDATE users SET locked_balances=locked_balances+${data.withdrawAmount} WHERE id=${currentUserId}`, (error, data) => {
                console.log(data);
            });
            if (item.length) {
                Notification.sendSMS(currentUserId, item[0].id, data);
            }
        })
    });

    socket.on('send:acceptWithdrawRequest', (data, callback) => {
        console.log("===============");
        console.log(data);
        console.log("===============");
        data.kind = 0;
        data.msgType = 'acceptWithdrawRequest';
        db.query(`UPDATE payment_histories SET state=1 WHERE refer_id=${data.withdrawId}`, (error, withdrawItem) => {
            console.log(withdrawItem)
        });
        db.query(`UPDATE users SET locked_balances=locked_balances-${data.withdrawAmount} WHERE id=${data.userId}`, (error, data) => {
            console.log(data);
        });
        db.query(`UPDATE withdraws SET status='success' WHERE id=${data.withdrawId}`, (error, item) => {
            if (error) throw error;
            Notification.sendSMS(currentUserId, data.userId, data);
            // callback({ status: 'OK', amount: data.amount })
        });
    });

    socket.on('send:rejectWithdrawRequest', (data, callback) => {
        
        data.kind = 0;
        data.msgType = 'rejectWithdrawRequest';
        db.query(`UPDATE payment_histories SET state=2 WHERE refer_id=${data.withdrawId}`, (error, withdrawItem) => {
            console.log(withdrawItem)
        });
        db.query(`UPDATE users SET locked_balances=locked_balances-${data.withdrawAmount} WHERE id=${data.userId}`, (error, data) => {
            console.log(data);
        });
        db.query(`UPDATE withdraws SET status='canceled' WHERE id=${data.withdrawId}`, (error, item) => {
            if (error) throw error;
            // Notification.sendSMS(currentUserId, data.userId, data);
            callback({ status: 'OK' })
        });
    });

    
}