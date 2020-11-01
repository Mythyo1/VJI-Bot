module.exports.run = async (client, message, args) => {
    if (!message.member.permission.has('voiceMuteMembers')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    const player = client.manager.players.get(message.channel.guild.id);
    if(!player) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `No songs currently playing in this guild.` } });
    if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `You need to be in a voice channel to use the ${this.help.name} command.` } });
    player.setQueueRepeat(player.queueRepeat ? false : true);
    return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `🔃 The queue is ${player.queueRepeat ? "now going to be repeated" : "no longer going to be repeated"}.` } });
}

module.exports.help = {
    name: "repeatqueue",
    aliases: ["repq", "rq"],
    syntax: "m!repeatqueue",
    description: "Enable queue repeat.",
    category: "music",
    permissions: ["Mute Members"]
}