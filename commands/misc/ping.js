module.exports.run = async (client, message, args) => {
    const m = await client.createMessage(message.channel.id, {
        embed: {
            title: "🏓",
            color: 0x186B2
        }
    });

    (message.channel.id, {
        embed: {
            title: "🏓 Pong!",
            color: 0x186B2,
            description: `Ping: ${m.timestamp - message.timestamp}ms`
        }
    });

    m.edit({
        embed: {
            title: ":ping_pong: Pong!",
            color: 0x186B2,
            description: `${client.functions.embedUtils.bar}💓 Ping: ${m.timestamp - message.timestamp}ms`
        }
    });
}

module.exports.help = {
    name: "ping",
    aliases: ["p"],
    syntax: "m!ping",
    description: "Check the bot ping.",
    category: "misc",
    permissions: ["No permissions required."]
}