module.exports.run = async (client, message, args) => {
    let page = null
    if (!args[0]) page = 1
    if (!args[0] == '1') page = 1 

    page1 = {
        author: {
            name: 'Barbarbar338\'s Page',
            url: 'https://discord.gg/BjEJFwh'
        },
        description: '**This is a small, sneaky and secret server that barbarbar338 provides support for the projects he has done.**\nYou can find the help and a bit of a good conversation about all the projects he has developed and continue to develop right here!\n\n**And this is an unlimited invitation link:** https://discord.gg/BjEJFwh\n**or you can check this:** https://bariscodes.me/discord'
    }
    
    index = {
        1: page1
    }

    client.createMessage(message.channel.id, { embed: index[page] })

}

module.exports.help = {
    name: "partners",
    aliases: ["partner"],
    syntax: "m!partner [page number]",
    description: "View partners.",
    category: "info",
    permissions: ["No permissions required."]
}