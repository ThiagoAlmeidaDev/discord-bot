const { ActivityType } = require('discord.js');
const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.bgCyan(`[BOT]`) + ` ${chalk.bold(client.user.username)} conectado com sucesso!`);

    // Bot status
    client.user.setActivity({
        name: '🤖',
        type: ActivityType.Playing,
    });
};
