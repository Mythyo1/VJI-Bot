const axios = require('axios')

module.exports.run = async (client, message, args) => {
    let api = 'https://official-joke-api.appspot.com/random_joke'
    let response = await axios.get(api);
    let data = response.data
    client.createMessage(message.channel.id, {
        embed: {
            color: 0x303136,
            fields: [
                {
                    name: data.setup,
                    value: data.punchline
                }
            ]
        }
    });
};

module.exports.help = {
    name: "joke",
    aliases: ["jokes"],
    syntax: "m!joke",
    description: "Get a funny message!",
    category: "fun",
    permissions: ["No permissions required."]
}