const { readdirSync } = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadHandlers(client) {
  const handlerPath = __dirname;
  const handlerFiles = readdirSync(handlerPath).filter(file => file.endsWith('.js') && file !== path.basename(__filename));

  handlerFiles.forEach(handler => {
    const filePath = path.join(handlerPath, handler)
    try {
      require(filePath)(client);
      console.log(chalk.magenta(`🔧 Handler carregado: ${handler}`));
    } catch (err) {
      console.error(`❌ Falha ao carregar handler ${chalk.bold(handler)}:\n`, err);
    }
  })
}

module.exports = loadHandlers;