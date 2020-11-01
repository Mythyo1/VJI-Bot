module.exports.run = async (client, message, args) => {
    client.createMessage(message.channel.id, {
        embed: {
            title: `**${client.user.username} | Developers**`,
            description: `${client.functions.embedUtils.bar}`,
            color: 0x186B2,
            fields: [
                {
                    name: "__**Developers**__",
                    value: `\`Syn\` - Head Developer\n\`IvanBaroff\` - Head Developer\n\`HVENetworks\` - Head Developer\n\`MarvelDC\` - Developer`,
                    inline: true
                },
                {
                    name: "__**Sponsors**__",
                    value: `\`HVENetworks\` - MongoDB Cluster\n\`HVENetworks\` - Bot Hosting`,
                    inline: true
                }
            ],
            footer: {
                text: `${client.user.username}'s credits`,
                icon_url: client.user.dynamicAvatarURL()
            },
            timestamp: client.functions.embedUtils.timestamp,
        }
    });
    


}

module.exports.help = {
    name: "credits",
    aliases: ["credit"],
    syntax: "m!credits",
    description: "View the bot developers and sponsors.",
    category: "misc",
    permissions: ["No permissions required."]
}
