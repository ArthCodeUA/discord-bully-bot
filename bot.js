const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

let currentConnection = null;
const hateList = ['id', 'id', 'id'];
const token = 'TOKEN';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', args => {
    if (args.member.voice.channel && hateList.includes(args.member.id)) {
        args.member.voice.kick('clown');
    }
});

client.on('message', async msg => {
    if (msg.content === 'join') {
        if (msg.member.voice.channel) {
            currentConnection = await msg.member.voice.channel.join();
        }
    }
    if (msg.content === 'leave') {
        currentConnection.disconnect();
    }
    if (msg.content === 'play') {
        currentConnection.play(fs.createReadStream('file.webm', { type: 'webm/opus' }));
    }
});

client.login(token);
