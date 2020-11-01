const Guilds = require('../../models/Guild');

module.exports.run = async (client, message, args) => {

    const roleDocument = await Guilds.findOne({ id: message.channel.guild.id });


    if (!message.member.permission.has('manageRoles')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });

    if (!args[1]) return client.createMessage(message.channel.id, { 
        embed: {
            title: `👤 ${client.user.username} | AutoRole`,
            description: `<@&${roleDocument['autoRole'].map(role => role).join(">\n<@&")}>`,
            color: 0x303136
        }
    }); 

    let roleList = message.channel.guild.roles.map(r => r.id);
    if (!roleList.includes(args[1])) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `The role you've eneted doesnt exist on \`${message.channel.guild.name}\`` )});
    
    let role = await message.channel.guild.roles.get(args[1])

    if (args[0].toLowerCase() == 'add' || args[0].toLowerCase() == 'a') {

        Guilds.findOne({ id: message.channel.guild.id }).then(async document => {
            if (document.autoRole.includes(role.id)) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `Autorole for \`${role.name}\` is already enabled.`) });
            document.autoRole.push(role.id);
            await document.save().then(res => {
                return client.createMessage(message.channel.id, { 
                    embed: {
                        title: `👤 ${client.user.username} | AutoRole`,
                        description: `I've enabled the autorole for the \`${role.name}\`.`,
                        color: parseInt(`0x${role.color}`).toString(16)
                    }
                });
            }).catch(err => {
                return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), err.toString()) });
            });
        });

    } else if (args[0].toLowerCase() == 'remove' || args[0].toLowerCase() == 'r') {

        await Guilds.findOne({ id: message.channel.guild.id }).then(async document => {
            if (!document.autoRole.includes(role.id)) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `Autorole for \`${role.name}\` is already disabled.`) });
            document.autoRole.pull(role.id);
            await document.save().then(res => {
                return client.createMessage(message.channel.id, { 
                    embed: {
                        title: `👤 ${client.user.username} | AutoRole`,
                        description: `I've disabled the autorole for the \`${role.name}\`.`,
                        color: parseInt(`0x${role.color}`).toString(16)
                    }
                });
            }).catch(err => {
                return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), err.toString()) });
            });
        });
    } else {
        return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });  
    } 
}


module.exports.help = {
    name: "autorole",
    aliases: ["ar"],
    syntax: "m!autorole <add|remove> <roleid|@role>",
    description: "AutoRoles when a user joins!",
    category: "admin",
    permissions: ["Manage Roles"]
}