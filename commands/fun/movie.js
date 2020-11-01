const axios = require('axios')

module.exports.run = async (client, message, args) => {
    let formatText = args.join('+')
    let title = formatText.toLowerCase()
    console.log(title)
    if (!args[0]) return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.syntaxError(this.help.syntax) });
    await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.MOVIE_API_KEY}`).then(res => {
        const body = res.data;
        console.log(res.data)
        if (res['data'].Response == "False") return client.createMessage(message.channel.id, { embed: client.functions.embedUtils.error(err) });
        if (res['data'].Response == "True") return client.createMessage(message.channel.id, {
            embed: {
                title: body.Title,
                description: body.Plot,
                image: {
                    url: body.Poster
                },
                color: 0x303136,
                fields: [
                    {
                        name: '__General:__',
                        value: `Released: \`${body.Released}\`\nDirector: \`${body.Director}\`\nGenre: \`${body.Genre}\`\nDuration: \`${body.Runtime}\`\nRated: \`${body.Rated}\``,
                        inline: true
                    },
                    {
                        name: '__Ratings:__',
                        value: `IMDB Rating: \`${body.imdbRating}\`\nIMDB Votes: \`${body.imdbVotes}\`\nBox Office: \`${body.BoxOffice}\`\nProduction: \`${body.Production}\``,
                        inline: true
                    },
                    {
                        name: '__More Ratings:__',
                        value: body['Ratings'].map(val => `${val.Source}: \`${val.Value}\``).join('\n')
                    },
                    {
                        name: '__Actors:__',
                        value: `\`\`\`yml\n${body.Actors}\`\`\``
                    },
                    {
                        name: '__Language:__',
                        value: `\`\`\`fix\n${body.Language}\`\`\``
                    },
                    {
                        name: '__Country:__',
                        value: `\`\`\`css\n${body.Country}\`\`\``
                    },
                ]
            }
        });
    });   
}

module.exports.help = {
    name: "movie",
    aliases: [],
    syntax: "m!movie <movie name>",
    description: "Reseach a movie.",
    category: "fun",
    permissions: ["No permissions required."]
}