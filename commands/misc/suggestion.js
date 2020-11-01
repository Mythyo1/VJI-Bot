module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    let tag = `${message.author.username}#${message.author.discriminator}`
    client.createMessage(message.channel.id, { embed: client.functions.embedUtils.success(`Thank you, \`${message.author.username}\` for this suggestion.`) })
    client.createMessage('737566972254093372', {
        embed: {
            author: {
                name: '💡 New Suggestion',
            },
            description: `\`${tag}\` has suggested: \n\n${args.join(" ")}`,
            thumbnail: {
                url: message.author.avatarURL
            },
            timestamp: client.functions.embedUtils.timestamp,
            color: client.functions.randomColor()
        }
    }).then(m => m.addReaction('🔼').then(m.addReaction('🔽')));
}

module.exports.help = {
    name: "suggest",
    aliases: ["suggestion", "suggestions"],
    syntax: "m!suggest <suggestion>",
    description: "Suggest an idea/something you'll like to see added to the bot.",
    category: "misc",
    permissions: ["No permissions required."]
}