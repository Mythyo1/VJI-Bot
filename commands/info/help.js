module.exports.run = async (client, message, args) => {
    if (args[0]) {

        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

        if (!cmd) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(client.functions.errorMessage(client), `This command doesn't exist! Please run \`${client.prefix}${this.help.name}\` to view all commands!`) });

        client.createMessage(message.channel.id, {
            embed: {
                title: `${client.user.username} | Advanced Help`,
                color: 0x186B2, 
                description: `${client.functions.embedUtils.bar}\n__Overview__:\n**Name - \`${cmd.help.name}\`\nAliases - \`[${cmd.help.aliases.join(", ")}]\`\nSyntax - \`${cmd.help.syntax}\`\nDescription - \`${cmd.help.description}\`\nCategory - \`${cmd.help.category}\`\nPermissions - \`${cmd.help.permissions.join(", ")}\`**`,
                footer: {
                    text: `<> = required | [] = optional`, 
                    icon_url: client.user.dynamicAvatarURL()
                },
                timestamp: client.functions.embedUtils.timestamp
            }
        });
    } else {

        const commands = [...client.commands].slice(0).map(command => command[1]).filter(command => !command.help.hide && !command.help.dev).sort((a, b) => a.help.name > b.help.name ? 1 : -1);

        let countCommands = 0;
        commands.forEach(command => countCommands++);

        let funL = commands.map(command => command).filter(command => command.help.category === 'fun')
        let fun = funL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!fun[0]) fun = `\`\`\`No commands are found in the fun category.\`\`\``

        let miscL = commands.map(command => command).filter(command => command.help.category === 'misc')
        let misc = miscL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')           
        if(!misc[0]) misc = `\`\`\`No commands are found in the misc category.\`\`\``

        let infoL = commands.map(command => command).filter(command => command.help.category === 'info')
        let info = infoL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!info[0]) info = `\`\`\`No commands are found in the info category.\`\`\``

        let radioL = commands.map(command => command).filter(command => command.help.category === 'radio')
        let radio = radioL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!radio[0]) radio = `\`\`\`No commands are found in the info category.\`\`\``

        let musicL = commands.map(command => command).filter(command => command.help.category === 'music')
        let music = musicL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!music[0]) music = `\`\`\`No commands are found in the info category.\`\`\``

        let moderationL = commands.map(command => command).filter(command => command.help.category === 'moderation')
        let moderation = moderationL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!moderation[0]) moderation = `\`\`\`No commands are found in the moderation category.\`\`\``
        
        let adminL = commands.map(command => command).filter(command => command.help.category === 'admin')
        let admin = adminL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!admin[0]) admin = `\`\`\`No commands are found in the admin category.\`\`\``

        let developerL = commands.map(command => command).filter(command => command.help.category === 'developer')
        let developer = developerL.map(command => `\`${client.prefix}${command.help.name}\` - ${command.help.description}`).join('\n')
        if(!developer[0]) developer = `\`\`\`No commands are found in the developer category.\`\`\``

        client.createMessage(message.channel.id, {
            embed: {
                title: `${client.user.username} | Help`,
                color: 0x186B2, 
                description: `${client.functions.embedUtils.bar}\nUse \`${client.prefix}${this.help.name} <name>\` to get more help on a command!\n\n__Command List__:\n`,
                fields: [
                    {
                        name: "> 😆 Fun",
                        value: fun
                    },
                    {
                        name: "> ⚙️ Misc",
                        value: misc
                    },
                    {
                        name: "> 📚 Info",
                        value: info
                    },
                    {
                        name: "> 📻 Radio",
                        value: radio
                    },
                    {
                        name: "> 🎵 Music",
                        value: music
                    },
                    {
                        name: "> 🔨 Moderation",
                        value: moderation
                    },
                    {
                        name: "> 🛠️ Admin",
                        value: admin 
                    },
                    {
                        name: "> ⛑️ Developer",
                        value: developer
                    }
                ],
                footer: {
                    text: `<> = required | [] = optional | Number of commands: ${countCommands}`, 
                    icon_url: client.user.dynamicAvatarURL()
                },
                timestamp: client.functions.embedUtils.timestamp
            }
        });
    }   
};

module.exports.help = {
    name: "help",
    aliases: ["halp", "h"],
    syntax: "m!help [command]",
    description: "Get info on a command.",
    category: "info",
    permissions: ["No permissions required."]
}