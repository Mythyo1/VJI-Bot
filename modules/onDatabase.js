const mongoose = require('mongoose')
const { readdir } = require('fs')

module.exports.run = (client) => {
    // Connect to the DB
    mongoose.connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        client.logger.ready('Connected to the database');
        readdir('models', async (err, files) => {
            if (err) return client.logger.error(err);
            for (let i = 0; i < files.length; i++) {

                let model = require('models/' + files[i]);
                let docs = await model.find({});
                for (let x = 0; x < docs.length; x++) {
                    await docs[x].save();
                };
            };
        });
    }).catch((err) => {
        client.logger.error(err);
    });
}