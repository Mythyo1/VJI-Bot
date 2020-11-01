const axios = require('axios')

module.exports.run = async (client, message, args) => {
    let api = 'https://useless-facts.sameerkumar.website/api'
    let response = await axios.get(api);
    let data = response.data
    console.log(data.data)
    client.createMessage(message.channel.id, {
        embed: {
            color: 0x303136,
            description: data.data
        }
    });
};

module.exports.help = {
    name: "fact",
    aliases: ["randomfact"],
    syntax: "m!joke",
    description: "Get a random fact!",
    category: "fun",
    permissions: ["No permissions required."]
}