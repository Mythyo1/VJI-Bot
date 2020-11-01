const humanizeDuration = require("humanize-duration");
const { MessageCollector } = require('eris-collector');

module.exports.run = async (client, message, args) => {
    let userVoice = message.channel.guild.members.get(message.author.id)
    let voiceChannel = userVoice.voiceState.channelID
    if (voiceChannel == null) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `Please make sure you're connected to a voice channel!`) });

    let channel = await message.channel.guild.channels.get(voiceChannel)
    if(!channel.permissionsOf(client.user.id).has('voiceConnect')) return client.createMessage(message.channel.id, { 
        embed: {
            title: `<a:Error:720595777835237386> \`${client.functions.errorMessage(client)}\``, 
            description: `I'm missing permissions please make sure that ModCord has the permission to connect to this voice channel.`, 
            color: 0xDC3C3C,
            image: {
                url: "https://gyazo.com/f374f4f6d365f02a358e9927b0d98cdd.png"
            },
        }  
    });

    if(!channel.permissionsOf(client.user.id).has('voiceSpeak')) return client.createMessage(message.channel.id, { 
        embed: {
            title: `<a:Error:720595777835237386> \`${client.functions.errorMessage(client)}\``, 
            description: `I'm missing permissions please make sure that ModCord has the permission to speak in voice channels permission.`, 
            color: 0xDC3C3C,
            image: {
                url: "https://gyazo.com/2aa1b969a665d4e990ecc2e2cc1fc8a3.png"
            },
        }  
    });

    if(!channel.permissionsOf(client.user.id).has('readMessages')) return client.createMessage(message.channel.id, { 
        embed: {
            title: `<a:Error:720595777835237386> \`${client.functions.errorMessage(client)}\``, 
            description: `I'm missing permissions please make sure that ModCord has the permission to view the channel you're in.`, 
            color: 0xDC3C3C,
            image: {
                url: "https://gyazo.com/aca5125555f8b5a21e0c1975e33c0242.png"
            },
        }  
    });

    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    
    try {
        const player = client.manager.create({
            guild: message.channel.guild.id,
            textChannel: message.channel.id,
            voiceChannel
        });


        player.connect();

        client.manager.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "NO_MATCHES":
                    if (!player.queue.current) player.destroy();
                    client.createMessage(message.channel.id, { 
                        embed: {
                            title: `🎵 ${client.user.username}'s | Music`,
                            color: 0x303136,
                            description: `**No matches were found.**`
                        }
                    });
                    break;

                case "TRACK_LOADED": 
                    player.queue.add(res.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.length) player.play();  
                    client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `Adding \`${res.tracks[0].title}\` to the queue.` } });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = humanizeDuration(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    client.createMessage(message.channel.id, {
                        embed: {
                            title: `🎵 ${client.user.username}'s | Music`,
                            color: 0x303136,
                            description: `**Adding \`${res.playlist.tracks.length} songs the queue. \`\n\`\`\`fix\nDuration: ${duration}\`\`\`**`
                        }
                    });
                    if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
                    break;

                case 'SEARCH_RESULT':
                    let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|cancel)$/i.test(m.content);
                    if (res.tracks.length < max) max = res.tracks.length;

                    client.createMessage(message.channel.id, {
                        embed: {
                            title: `🎵 ${client.user.username}'s | Music`,
                            description: `${res.tracks.slice(0, max).map((track, index) => `**${++index} - ${track.title}**`).join('\n')}`,
                            color: 0x303136,
                            footer: {
                                text: `Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection.`,
                                icon_url: client.user.avatarURL
                            }
                        }
                    });

                    let collector = new MessageCollector(client, message.channel, filter, {
                        time: 1000 * 30,
                    });

                    collector.on('collect', (m) => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const index = Number(m.content) - 1;
                        if (index < 0 || index > (max - 1)) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `The number you provided too small or too big (1-${max}).` } });
                
                        const track = res.tracks[index];
                        player.queue.add(track);

                        client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `Adding \`${track.title}\` to the queue.` } });

                        if (!player.playing && !player.paused && !player.queue.length) player.play();

                        collector.stop();
                    });

                    collector.on('end', (_, reason) => {
                        if (["time", "cancelled"].includes(reason)) return client.createMessage(message.channel.id, { embed: { title: `🎵 ${client.user.username}'s | Music`, color: 0x303136, description: `Cancelled selection.` } });
                        if (!player.queue.current) player.destroy();
                    });

                    break;
            }
        });
    } catch {
        client.createMessage(message.channel.id, { 
            embed: {
                title: `🎵 ${client.user.username}'s | Music`,
                color: 0x303136,
                description: `**An error occured. Music failed to start.**`
            }
        });
    }
};

module.exports.help = {
    name: "play",
    aliases: [],
    syntax: "vji!play [song]",
    description: "Play a song.",
    category: "music",
    permissions: ["No permissions required."]
}