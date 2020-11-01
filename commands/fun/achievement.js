module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    client.createMessage(message.channel.id, {
        embed: {
            color: 0x303136,
            image: {
                url: `https://api.alexflipnote.dev/achievement?text=${args.join("+")}`
            }
        }
    });
}

module.exports.help = {
    name: "achievement",
    aliases: [],
    syntax: "m!achievement <text>",
    description: "Get a text on an achievement message!",
    category: "fun",
    permissions: ["No permissions required."]
}