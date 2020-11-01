const numberIndex = {
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
};

module.exports.run = async (client, message, args) => {
    const string = args.join(' ')
    const splitQuestion = string.split('?');

    const choices = splitQuestion[1.].trim().replace('[', '').replace(']', '').split(/, /g);

    const choiceList = []
    for (let i = 0; i < choices.length; i++) {
        choiceList.push(` | ${numberIndex[i + 1]} | ${choices[i]}`)
    }

    const poll = await client.createMessage(message.channel.id, {
        embed: {
            title: `📊 ModCord | Poll by ${message.author.username}`, 
            description: `**${splitQuestion[0]}?**\nPlease react appropriately to the wanted option.\n-------------------------------------------------------------\n${choiceList.join('\n-------------------------------------------------------------\n')}\n-------------------------------------------------------------`,
            color: 0x303136
        }
    });

    for (let i = 0; i < choices.length; i++) {
        poll.addReaction(numberIndex[i + 1]);
    }
}

module.exports.help = {
    name: "poll",
    aliases: [],
    syntax: "m!poll <question?> <[options, yes, no]>",
    description: "Create a poll.",
    category: "misc",
    permissions: ["No permissions required."]
}