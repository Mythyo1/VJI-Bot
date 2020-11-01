const Guilds = require('../../models/Guild')
const Users = require('../../models/User');

module.exports.run = async (client, message, args) => {
    let userdata = await Users.findOne({ id: message.author.id });
    if (!message.member.permission.has('manageGuild') && userdata.admin != true) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    Guilds.updateOne({ id: message.channel.guild.id }, { prefix: args[0] }).catch((err) => client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client)) }));
    return await client.createMessage(message.channel.id, { embed: client.functions.embedUtils.success(`The prefix was changed to \`${args[0]}\``) });

}

module.exports.help = {
    name: "prefix",
    aliases: [],
    syntax: "m!prefix <prefix>",
    description: "Change the bot prefix.",
    category: "misc",
    permissions: ["Manage Guild"]
}