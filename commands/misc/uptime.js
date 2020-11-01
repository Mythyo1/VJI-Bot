module.exports.run = async (client, message, args) => {
    

let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        client.createMessage(message.channel.id, {
            embed: {
                title: `**Uptime: \`${uptime}\`**`,
                color: 0x186B2,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: message.author.dynamicAvatarURL()
                },
                timestamp: client.functions.embedUtils.timestamp,
            }
        })

}

module.exports.help = {
    name: "uptime",
    aliases: ["ut"],
    syntax: "m!uptime",
    description: "Check the bots uptime.",
    category: "misc",
    permissions: ["No permissions required."]
}