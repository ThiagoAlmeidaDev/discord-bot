const path = require('path');
const chalk = require('chalk');

/**
 * Configura o ambiente com base no argumento da linha de comando.
 * @returns {string} O nome do arquivo .env utilizado.
 */

function loadEnvironment(dotenv) {
  let envFile = '.env.production';
  const args = process.argv.slice(2);

  if (args.includes('development')) {
    envFile = '.env.development';
  }

  const configEnv = dotenv.config({ path: path.resolve(__dirname, '../../', envFile) }); // Caso esteja ocorrendo erros, cheque o caminho relativo do arquivo.

  if(configEnv.error) {
    const envPath = path.resolve(__dirname, '../../', envFile);
    console.warn(chalk.yellow(`\nO caminho da pasta do arquivo ${envFile} está incorreto.`));
    console.log(`Caminho para o arquivo .env: ${envPath}`);

    process.exit(1);
  }

  console.log(chalk.blue(`🔄️ Usando configurações do arquivo: ${envFile}`));

  return envFile;
}

module.exports = loadEnvironment;
