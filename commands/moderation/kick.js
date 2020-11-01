let reason = ""

module.exports.run = async (client, message, args) => {
    // Permission Check
    if (!message.member.permission.has('kickMembers')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });

    // User check
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    client.functions.getMember(client, message, args[0]).then(async u => {
        if (!u.member) return client.createMessage(message.channel.id, { embed: { title: `I couldn't find the wanted user.\nIssue: \`${args[0]} not found.\``}});
        if (u.member.permission.has('kickMembers')) return client.createMessage(message.channel.id, { embed: client.functions.kickEmbed.userPermErr(this.help.permissions) });

        // Get reason
        args.shift();
        if (!args[0]) reason = "No reason specified!"
        if (args[0]) reason = args.join(" ")
        
        let kUserRoles = message.channel.guild.members.get(u.member.id).roles[0];
        let r1 = message.channel.guild.roles.get(kUserRoles).position;

        let kBotRoles = message.channel.guild.members.get(client.user.id).roles[0];
        let r2 = message.channel.guild.roles.get(kBotRoles).position;

        if (r1 > r2) return client.createMessage(message.channel.id, { 
            embed: {
                title: `<a:Error:720595777835237386> \`${client.functions.errorMessage(client)}\``, 
                description: `I'm missing permissions please make sure the ModCord role is at the top of the roles.`, 
                color: 0xDC3C3C,
                image: {
                    url: "https://gyazo.com/bd5d47c62e8eba4a5deec4010e07f52a.png"
                },
            }  
        });

        // Kick message
        let channel = await client.getDMChannel(u.member.user.id)
        await client.createMessage(channel.id, { embed: client.functions.kickEmbed.kicked(u.member, message, reason) }).catch(err => client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `${u.member.user.username} was kicked. However, I couldn't send a dm.`) }));


        // Logs
        // await client.createMessage(message.channel.id, { embed: client.functions.kickEmbed.logs(u.member, message, reason) });


        // Kick user
        u.member.kick().catch(err => {
            if (err) client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `An issue occured when kicking.`) });
            if (!err) client.createMessage(message.channel.id, { embed: client.functions.embedUtils.success(`${u.member.user.username} was kicked successfully!`) }); 
        });
    });
};

module.exports.help = {
    name: "kick",
    aliases: [],
    syntax: "m!kick <user> [reason]",
    description: "Kick a member from the server.",
    category: "moderation",
    permissions: ["Kick Members"]
}