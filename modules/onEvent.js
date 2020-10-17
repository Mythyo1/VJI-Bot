module.exports.run = (client) => {
    client.on('ready', async () => {
        client.editStatus('online', {
            name: `vji!help | VJI Bot`, 
            type: 3,
        });
        client.logger.ready(`Logged in as ${client.user.username} | Users: ${client.users.size} | Guilds: ${client.guilds.size}`);
    });

    client.on('disconnect', () => client.logger.disconnect(`Disconnected from ${client.user.username}`));
    client.on('reconnect', () => client.logger.reconnect(`Reconnected as ${client.user.username}`))
}