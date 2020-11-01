const axios = require('axios')

module.exports.run = async (client, message, args) => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            client.createMessage(message.channel.id, {
                embed: {
                    color: 0x303136,
                    title: `Bitcoin \`(BTC)\`: \`$${cryptos.toString()}USD\``
                }
            });
        });
};

module.exports.help = {
    name: "bitcoin",
    aliases: ["bc"],
    syntax: "m!bitcoin",
    description: "Get the price of 1 bitcoin!",
    category: "fun",
    permissions: ["No permissions required."]
}