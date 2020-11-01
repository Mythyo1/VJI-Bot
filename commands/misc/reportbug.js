module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    let tag = `${message.author.username}#${message.author.discriminator}`
    client.createMessage(message.channel.id, { embed: client.functions.embedUtils.success(`Thank you, \`${message.author.username}\` for reporting a bug.`) })
    client.createMessage('733933334996189256', {
        embed: {
            author: {
                name: '🐛 New Bug Report',
            },
            description: `\`${tag}\` has reported a bug: \n\n${args.join(" ")}`,
            thumbnail: {
                url: message.author.avatarURL
            },
            timestamp: client.functions.embedUtils.timestamp,
            color: client.functions.randomColor()
        }
    });
}

module.exports.help = {
    name: "bugreport",
    aliases: ["reportbug", "bug"],
    syntax: "m!bug <bug>",
    description: "Report a bug needing fixing.",
    category: "misc",
    permissions: ["No permissions required."]
}