const Purges = require('../../models/Purge');

module.exports.run = async (client, message, args) => {
    let data = [];
    const number = Number(args[0]) === Number(args[0]) ? Number(args[0]) : null;
    if (!message.member.permission.has('manageMessages')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    if (number % 1 !== 0) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `Number needs to be a whole number.`) }); 
    if ((number <= 0) || (number >= 100)) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `Number needs to be larger than 1, and smaller than 100.`) }); 
    client.getMessages(message.channel.id, (number + 1)).then(messages => messages.map(msg => data.push({ content: msg.content, author: msg.author.id })));
    try {
        await client.purgeChannel(message.channel.id, (number + 1)).then(total => client.createMessage(message.channel.id, {
            embed: {
            title: `Purge Analysis`,
            color: 0x186B2,
            fields: [
                    {
                        name: `**__Messages__**`,
                        value: `\`${total - 1}\`/\`${number}\``,
                        inline: true
                    },
                    {
                        name: `**__Moderator__**`,
                        value: `\`${message.author.username}\``,
                        inline: true
                    }
                ], 
                timestamp: client.functions.embedUtils.timestamp
            }
        }));
    } catch (err) {
        return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `${err}`) });
    }
    const purge = new Purges({
        _id: parseInt(message.id).toString(16),
        messages: data,
        mod: message.author.id
    });
    await purge.save().catch(err => client.logger.error(err));
}

module.exports.help = {
    name: "purge",
    aliases: ["prune"],
    syntax: "m!purge <amount>",
    description: "Delete 1-100 messages at one time.",
    category: "moderation",
    permissions: ["Manage Messages"]
}