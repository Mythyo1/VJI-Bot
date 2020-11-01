let index = 0;

module.exports.run = async (client, message, args) => {
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    const player = client.manager.players.get(message.channel.guild.id);
    if(!player) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `No songs currently playing in this guild.` } });
      
    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = player.queue.slice(start, end);

    const maxPages = Math.ceil(player.queue.length / multiple);

    `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${x.requester.username}**.`).join("\n")}`;

    return client.createMessage(message.channel.id, { 
        embed: { 
            title: `🎵 ${client.user.username}'s | Music`,
            color: 0x303136, 
            thumbnail: {
                url: player.queue.current.thumbnail 
            },
            description: `__**Currently Playing**__\n [${player.queue.current.title}](${player.queue.current.uri}) - **Requested by ${player.queue.current.requester.username}**.\n\n__**Rest of queue:**__\n${tracks.map((track, i) => `${start + (++i)} ) [${track.title}](${track.uri}) ** - Requested by ${track.requester.username}**.`).join("\n")}` 
        } 
    });
}

module.exports.help = {
    name: "queue",
    aliases: ["q"],
    syntax: "m!queue",
    description: "View the songs in the queue.",
    category: "music",
    permissions: ["No permissions required."]
}