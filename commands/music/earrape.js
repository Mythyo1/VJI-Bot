const levels = {
    none: 0.0,
    low: 0.10,
    medium: 0.15,
    high: 0.25,
};

module.exports.run = async (client, message, args) => {
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    const player = client.manager.players.get(message.channel.guild.id);
    if(!player || !player.queue[0]) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `No songs currently playing in this guild.` } });
    const { title, author, duration, thumbnail, uri } = player.queue.current;
    let level = "none";
    if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();
    player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));
    return client.createMessage(message.channel.id, { 
        embed: { 
            title: `🎵 ${client.user.username}'s | Music`, 
            color: 0x303136, 
            description: `Earrape was set to ${level}`, 
            fields: [ 
                { 
                    name: 'Queue Repeat',
                    value: `\`\`\`fix\n${player.queueRepeat ? 'Enabled' : 'Disabled'}\`\`\``,
                    inline: true
                },
                { 
                    name: 'Track Repeat',
                    value: `\`\`\`fix\n${player.trackRepeat ? 'Enabled' : 'Disabled'}\`\`\``,
                    inline: true
                }
            ],
            thumbnail: { url: thumbnail } 
        } 
    });
};

module.exports.help = {
    name: "earrape",
    aliases: ["er"],
    syntax: "m!earrape [level]",
    description: "View the current song being played.",
    category: "music",
    permissions: ["No permissions required."]
}