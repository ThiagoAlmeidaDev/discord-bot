const chalk = require('chalk');

//Configura o tratamento global de exceções e rejeições.
function handleGlobalErrors() {
  process.on('uncaughtException', (error) => {
    console.error(chalk.red(`[ERRO] Exceção não tratada:\n`), error);
  });

  process.on('unhandledRejection', (error) => {
    console.error(chalk.red(`[ERRO] Rejeição não tratada:\n`), error);
  });
}

module.exports = handleGlobalErrors;