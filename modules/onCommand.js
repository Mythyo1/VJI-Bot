const Guild = require('../models/Guild');

module.exports.run = (client) => {
    client.on('messageCreate', async (message) => {
        // Author type check
        if (message.author.bot) return; 

        // Define the prefix
        let guildDocument = await Guild.findOne({ id: message.channel.guild.id });
        if (!guildDocument) await Guild.create({ id: message.channel.guild.id }, { new: true });

        let prefix = guildDocument.prefix || "m!"
        client.prefix = prefix;

        // Message checks
        if (!message.channel.guild || !message.content.startsWith(prefix)) return; // guild channel | contains prefix

        // Define essentials
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        // Command length check
        if (cmd.length === 0) return;

        // Get the command
        let command = client.commands.get(cmd);
        // If none is found, try to find it by alias
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        // If a command is finally found, run the command
        if (command) 
        command.run(client, message, args);
    });
}