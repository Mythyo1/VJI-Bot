const humanizeDuration = require("humanize-duration");

module.exports.run = async (client, message, args) => {
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    const player = client.manager.players.get(message.channel.guild.id);
    if(!player || !player.queue.current) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `No songs currently playing in this guild.` } });
    const { title, author, duration, thumbnail, uri } = player.queue.current;
    return client.createMessage(message.channel.id, { 
        embed: { 
            title: `🎵 ${client.user.username}'s | Music`, 
            color: 0x303136, 
            description: `Playing: [${player.playing ? "▶️" : "⏸️"} **${title}**](${uri}) \`${humanizeDuration(duration)}\` by ${author}`, 
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
    name: "nowplaying",
    aliases: ["np", "playing"],
    syntax: "m!nowplaying",
    description: "View the current song being played.",
    category: "music",
    permissions: ["No permissions required."]
}