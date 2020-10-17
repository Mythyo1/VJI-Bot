const User = require('../models/User');
const Guild = require('../models/Guild');

module.exports.run = (client) => {

    client.on('guildMemberAdd', async (guild, member) => {
        if (member.bot) return;
        let userDocument = await User.findOne({ id: member.id });   
        if (!userDocument) await User.create({ id: member.id });
    });

    // client.on('guildCreate', async (guild) => {
    //     let guildDocument = await Guild.findOne({ id: guild.id });
    //     if (!guildDocument) await Guild.create({ id: guild.id });
    // });

    // client.on('messageCreate', async (message) => {

    //     let guildDocument = await Guild.findOne({ id: message.channel.guild.id });
    //     if (!guildDocument) await Guild.create({ id: message.channel.guild.id });

    //     if (message.author.bot) return;

    //     let userDocument = await User.findOne({ id: message.author.id });
    //     if (!userDocument) await User.create({ id: message.author.id });
    // });
};