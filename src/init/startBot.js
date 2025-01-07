const chalk = require('chalk');

const startBot = async (client) => {
  try {
    await client.login(process.env.BOT_TOKEN);
  } catch (error) {
    console.error(chalk.red('Falha ao conectar o bot:\n'), error);
    throw error;
  }
};

module.exports = startBot;
