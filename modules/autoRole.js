const Guilds = require('../models/Guild');

module.exports.run = (client) => {
    
    client.on('ready', async () => {
        client.on('guildMemberAdd', async (guild, member) => {
            Guilds.findOne({ id: guild.id }).then(res => {
                res.autoRole.forEach(role => {
                    client.guilds.get(guild.id).members.get(member.id).addRole(role)
                });
            });
        });
    });

};