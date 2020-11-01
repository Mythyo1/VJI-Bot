const randomPuppy = require("random-puppy");
module.exports.run = async (client, message, args) => {

    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    client.createMessage(message.channel.id, {
        embed: {
            title: `${random.replace('_', ' ')}`, 
            url: `https://reddit.com/r/${random}`,
            color: client.functions.randomColor(),
            image: {
                url: img
            }
        }
    });
}

module.exports.help = {
    name: "meme",
    aliases: ["memes", "memez"],
    syntax: "m!meme",
    description: "Sends a random meme.",
    category: "fun",
    permissions: ["No permissions required."]
}