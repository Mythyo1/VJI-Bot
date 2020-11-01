const { uptime } = require('bot-utils')
let data = "";
let { totalmem, cpus } = require('os')
const Users = require('../../models/User');

module.exports.run = async (client, message, args) => {

    pingRead = async function() {
        let beforeRead = new Date()
        let pingUser = await Users.findOne({ id: "ping" });
        let afterRead = new Date()
        let read = afterRead - beforeRead
        return read;
    }

    pingWrite = async function () {
        let beforeWrite = new Date()
        let pingUser = await Users.findOne({ id: "ping" });
        pingUser.test = message.id
        await pingUser.save()
        let afterWrite = new Date()
        let write = afterWrite - beforeWrite
        return write;
    }

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
        let outOf = totalmem() / 1024 / 1024;
        if(outOf >= 1024) {
            outOf = outOf / 1024
            data = `${Math.round(outOf * 100) / 100}GB`
        } else {
            data = `${Math.round(outOf * 100) / 100}MB`
        }

    client.createMessage(message.channel.id, {
        embed: {
            title: `**⚙️ ${client.user.username} | Info**`,
            description: `${client.functions.embedUtils.bar}`,
            color: 0x186B2,
            thumbnail: {
                url: client.user.avatarURL
            },
            fields: [
                {
                    name: "**🌐 Bot Version**",
                    value: "1.1.0",
                    inline: true
                },
                {
                    name: "**📚 Library**",
                    value: "Eris",
                    inline: true
                },
                {
                    name: "**👥 Total Users**",
                    value: `${client.users.size}`,
                    inline: true
                },
                {
                    name: "🏰 Total Guilds",
                    value: `${client.guilds.size}`,
                    inline: true
                },
                {
                    name: "📖 Database Read",
                    value: `${await pingRead()}ms`,
                    inline: true
                },
                {
                    name: "✍️ Database Write",
                    value: `${await pingWrite()}ms`,
                    inline: true
                },
                {
                    name: "**<:RAM:720596819725254658> RAM**",
                    value: `\`\`\`${Math.round(used * 100) / 100}MB / ${data}\`\`\``,
                    inline: true
                },
                {
                    name: "**🆙 Uptime**",
                    value: `\`\`\`fix\n${uptime()}\`\`\``,
                    inline: true
                },
                {
                    name: "<:cpu:739120677017092137> CPU",
                    value: `\`\`\`yml\n${cpus().map(cpu => cpu.model).toString()}\`\`\``
                }
            ],
        }
    });
    


}

module.exports.help = {
    name: "botinfo",
    aliases: ["bot", "bi"],
    syntax: "m!botinfo",
    description: "View the bot statistics.",
    category: "misc",
    permissions: ["No permissions required."]
}