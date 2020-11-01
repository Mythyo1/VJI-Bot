module.exports.run = async (client, message, args) => {

    let toOwoify = args.join(" ")

    var faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];
    function OwoifyText(input) {
        input = input.replace(/(?:r|l)/g, "w");
        input = input.replace(/(?:R|L)/g, "W");
        input = input.replace(/n([aeiou])/g, 'ny$1');
        input = input.replace(/N([aeiou])/g, 'Ny$1');
        input = input.replace(/N([AEIOU])/g, 'Ny$1');
        input = input.replace(/ove/g, "uv");
        input = input.replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");
        return input;
    };

    client.createMessage(message.channel.id, {
        embed: {
            color: 0x303136,
            description: OwoifyText(toOwoify)
        }
    });

};
module.exports.help = {
    name: "owoify",
    aliases: ["owo"],
    syntax: "m!owoify <text>",
    description: "Owoify a line of text!",
    category: "fun",
    permissions: ["No permissions required."]
}