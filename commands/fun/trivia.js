const axios = require('axios');
const { MessageCollector } = require('eris-collector');

module.exports.run = async (client, message) => {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean');

    const filter = msg => msg.author.id === message.author.id && msg.content !== '' && ['true', 'false', 'cancel'].includes(msg.content.toLowerCase());
    const collector = new MessageCollector(client, message.channel, filter, {
        max: 10
    });

    let score = 0
    let questionNumber = 0;

    let timeout = await startQuestion(client, collector, questionNumber, getQuestion(response, questionNumber))

    collector.on('collect', async (msg) => {
        msg.content = msg.content.toLowerCase();

        if (msg.content === 'cancel') return collector.stop('cancelled');

        const answer = response.data.results[questionNumber].correct_answer.toLowerCase();

        if (msg.content === answer) {
            score++;
            await client.createMessage(message.channel.id, {
                embed: {
                    title: `${client.user.username} | Trivia`,
                    color: 0x32CD32,
                    description: `The answer is correct!`
                }       
            });
        } else {
            await client.createMessage(message.channel.id, {
                embed: {
                    title: `${client.user.username} | Trivia`,
                    color: 0xFF0000,
                    description: `The answer is incorrect!`
                }
            });
        }

        clearTimeout(timeout);

        if (questionNumber >= 9) return collector.stop('finished');
        questionNumber++;

        timeout = await startQuestion(client, collector, questionNumber, getQuestion(response, questionNumber));
    });

    collector.on('end', (_, reason) => {
        clearTimeout(timeout);

        if (reason === 'limit' && questionNumber >= 9 || reason === 'finished') return client.createMessage(message.channel.id, `Score: ${(score * 10)}%`);
        // if (reason === 'limit') user answered over 10 times
        // else if (reason === 'time') user did not answer within 30 seconds
        client.createMessage(message.channel.id, { embed: { title: `${client.user.username} | Trivia`, color: 0x303136, description: `Trivia cancelled.` } });
    });
};

module.exports.help = {
  name: "trivia",
  aliases: ["triv"],
  syntax: "m!triva",
  description: "Play trivia!",
  category: "fun",
  permissions: ["No permissions required."]
}

function getQuestion(response, number) {
  return response.data.results[number].question.replace(/&quot;/g, '`').replace(/&#039/g, '\'');
}

function startQuestion(client, collector, questionNumber, question) {
  return client.createMessage(collector.channel.id, {
    embed: {
      title: `${client.user.username} | Trivia`,
      color: 0x303136,
      description: `**Question ${questionNumber + 1}:** ${question}`
    }
  })
  .then(() => {
    return setTimeout(() => {
      collector.stop('time');
    }, 1000 * 30);
  });
}