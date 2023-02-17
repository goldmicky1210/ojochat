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

    
}