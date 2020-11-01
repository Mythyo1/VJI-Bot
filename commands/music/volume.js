module.exports.run = async (client, message, args) => {
    if (!message.member.permission.has('voiceMuteMembers')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    const player = client.manager.players.get(message.channel.guild.id);
    if(!player) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `No songs currently playing in this guild.` } });
    if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `You need to be in a voice channel to use the ${this.help.name} command.` } }); 
    if (!args[0]) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `🔊 Current Volume: \`${player.volume}\`` } });
    if (Number(args[0]) <= 0 || Number(args[0]) > 100) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `🔊 Please ensure that your number is between 1-100!` } });
    player.setVolume(Number(args[0]));
    return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `🔊 Successfully set the volume to: \`${args[0]}\`` } });
}

module.exports.help = {
    name: "volume",
    aliases: ["vol"],
    syntax: "m!volume [volume]",
    description: "Change the volume.",
    category: "music",
    permissions: ["Mute Members"]
}