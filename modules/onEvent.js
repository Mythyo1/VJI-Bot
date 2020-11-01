module.exports.run = (client) => {
    client.on('ready', async () => {
        client.editStatus('online', {
            name: `m!help | ModCord`, 
            type: 3,
        });
        client.manager.init(client.user.id);
        client.logger.ready(`Logged in as ${client.user.username} | Users: ${client.users.size} | Guilds: ${client.guilds.size}`);
    });
    client.on("rawWS", (d) => client.manager.updateVoiceState(d));
    client.on('disconnect', () => client.logger.disconnect(`Disconnected from ${client.user.username}`));
    client.on('reconnect', () => client.logger.reconnect(`Reconnected as ${client.user.username}`))
}