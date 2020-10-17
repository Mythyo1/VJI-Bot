const { Manager } = require('erela.js');
const humanizeDuration = require("humanize-duration");
const Spotify  = require("erela.js-spotify");
module.exports.run = (client) => {

    // const clientID = process.env.MUSIC_CLIENT_ID
    // const clientSecret = process.env.MUSIC_CLIENT_SECRET

    client.manager = new Manager({

        // plugins: [ new Spotify({ clientID, clientSecret }) ],

        nodes: [
            {
                host: "localhost",
                port: 2333, 
                password: "youshallnotpass", 
                secure: false,
            },
        ],

        autoPlay: true,

        send(id, payload) {
            const guild = client.guilds.get(id);
            if (guild) guild.shard.sendWS(payload.op, payload.d)
        },
    })
    .on("nodeConnect", () => client.logger.ready("Connect to the node."))
    .on("nodeError", (node, error) => console.log(`${error.message}`))
    .on("trackStart", (player, { title, author, duration, uri, requester} ) => {
        client.createMessage(player.options.textChannel, {
            embed: {    
                title: `🎵 ${client.user.username}'s | Music`,
                color: 0x303136,
                description: `**Now playing: [\`${title} by ${author}\`](${uri}) requested by \`${requester.username}\`.\n\`\`\`fix\n${humanizeDuration(duration)}\`\`\`**`
            }
        }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 1000 * 15)
        });
    })
    .on("queueEnd", (player) => {
        client.createMessage(player.options.textChannel, {
            embed: {
                title: `🎵 ${client.user.username}'s | Music`,
                color: 0x303136,
                description: `**The queue has ended. Run \`${client.prefix}play <song>\` to start playing music!**`
            }
        });
        player.destroy();
    });
}