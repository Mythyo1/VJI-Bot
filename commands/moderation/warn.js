let reason = ""
const Guilds = require('../../models/Guild');

module.exports.run = async (client, message, args) => {
    // Permission Check
    if (!message.member.permission.has('manageMessages')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    
    // User check
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    client.functions.getMember(client, message, args[0]).then(async u => {
        if (!u.member) return client.createMessage(message.channel.id, { embed: { title: `I couldn't find the wanted user.\nIssue: \`${args[0]} not found.\``}});

        // Get reason
        args.shift();
        if (!args[0]) reason = null
        if (args[0]) reason = args.join(" ")
        
        let wUserRoles = message.channel.guild.members.get(u.member.id).roles[0];
        let r1 = message.channel.guild.roles.get(wUserRoles).position;

        let wUserMod = message.channel.guild.members.get(message.author.id).roles[0];
        let r2 = message.channel.guild.roles.get(wUserMod).position;

        if (r1 > r2) return client.createMessage(message.channel.id, { 
            embed: {
                title: `<a:Error:720595777835237386> \`${client.functions.errorMessage(client)}\``, 
                description: `${u.member.user.username} has a higher role than you.`, 
                color: 0xDC3C3C,
                image: {
                    url: "https://gyazo.com/bd5d47c62e8eba4a5deec4010e07f52a.png"
                },
            }  
        });

        let channel = await client.getDMChannel(u.member.user.id)
        await client.createMessage(channel.id, { embed: client.functions.warnEmbed.warned(u.member, message, reason) }).catch(err => client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `${u.member.user.username} was warned. However, I couldn't send a dm.`) }));


        // Logs
        // await client.createMessage(message.channel.id, { embed: client.functions.kickEmbed.logs(u.member, message, reason) });



        // Warn user


        Guilds.findOne({ id: message.channel.guild.id }).then(async document => {
            document.warns.push({ userID: u.member.user.id, reason: reason });
            await document.save();
        }).catch(err => {
            if (err) client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `An issue occured when warning.`) });
            if (!err) client.createMessage(message.channel.id, { embed: client.functions.embedUtils.success(`${u.member.user.username} was warned successfully!`) }); 
        });
    });
};

module.exports.help = {
    name: "warn",
    aliases: [],
    syntax: "m!warn <user> [reason]",
    description: "Warn a member on the server.",
    category: "moderation",
    permissions: ["Manage Messages"]
}