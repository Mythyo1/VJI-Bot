const axios = require('axios')

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    let api = `https://api.funtranslations.com/translate/yoda.json?text=${args.join('+')}`
    let response = await axios.post(api).catch(err => client.functions.embedUtils.error(client.functions.errorMessage(client), `An issue occured when kicking.`));
    let data = response.data.contents
    client.createMessage(message.channel.id, {
        embed: {
            color: 0x303136,
            title: data.translated
        }
    });
};

module.exports.help = {
    name: "yoda",
    aliases: [],
    syntax: "m!yoda [text, you shall enter.]",
    description: "Get the yoda translation!",
    category: "fun",
    permissions: ["No permissions required."]
}