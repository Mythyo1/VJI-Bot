module.exports.run = async (client, message, args) => {
    // Permission Check
    if (!message.member.permission.has('manageMessages')) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.permError(this.help.permissions) });
    
    // User Input
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    
    // User Check
    client.functions.getMember(client, message, args[0]).then(async u => {

        if (u.member == null || u.member == undefined) return client.createMessage(message.channel.id, { embed: { title: `I couldn't find the wanted user.\nIssue: \`${args[0]} not found.\``}});

        // Get reason
        args.shift();
        let reason = args.join(" ")
        if (!args[0]) reason = "No reason specified!"

        let mUserRoles = message.channel.guild.members.get(u.member.id).roles[0];
        let r1 = message.channel.guild.roles.get(mUserRoles).position;

        let mBotRoles = message.channel.guild.members.get(client.user.id).roles[0];
        let r2 = message.channel.guild.roles.get(mBotRoles).position;

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
        
        let muteRole = message.channel.guild.roles.find(r => r.name === "Muted");
        if(!muteRole) {
            try {
                muteRole = await message.channel.guild.createRole({
                    name: "Muted",
                    color: 0x514f48,
                    permissions: 0
                });

                let c = message.channel.guild.channels.map(x => x.id);
                c.forEach((c, id) => message.channel.guild.channels.get(c).editPermission(muteRole.id, 1180672, 2529344, 'role', `${client.user.username} muting system config.`));

            } catch (err) {
                return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `I couldn't create a Mute role. Please make sure I have the the \`Manage Roles\` permission.`) })
            }
        }

        if (u.member.roles.includes(muteRole.id) == false) return client.createMessage(message.channel.id, { embed: { description: `${u.member.user.username} is not muted.`, color: 0xDC3C3C } });


        u.member.removeRole(muteRole.id)
            .catch((err) => client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `I don't have the permission to remove the role.\`\`\`${err}\`\`\``) }))

        // Mute message
        let userDMChannel = await client.getDMChannel(u.member.user.id)
        return client.createMessage(message.channel.id, { embed: { color: 0xDC3C3C, description: `**${u.member.user.username}**\`(${u.member.user.id})\` was unmuted by **${message.author.username}**\`(${message.author.id})\` for \`${reason}\`.`}})
            .then(() => {
                client.createMessage(userDMChannel.id, { embed: client.functions.unmuteEmbed.unmuted(u.member, message, reason)})
        }).catch(err => client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `${u.member.user.username} was unmuted. However, I couldn't send a dm.`) }));

    });
}

module.exports.help = {
    name: "unmute",
    aliases: ["umute"],
    syntax: "m!unmute <user> [reason]",
    description: "Unmute a member on the server.",
    category: "moderation",
    permissions: ["Manage Messages"]
}