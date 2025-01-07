const { readdirSync, existsSync } = require('fs');
const { REST, Routes } = require('discord.js');
const path = require('path');
const chalk = require('chalk');

function loadSubDirsCommands(client) {
  const commandsFolderPath = '../commands';
  const commandsFilesPath = path.resolve(__dirname, commandsFolderPath);

  if (!existsSync(commandsFilesPath)) {
    throw new Error(`O diretório da pasta de comandos ${commandsFilesPath} não existe.`);
  }

  const commandsSubDirs = readdirSync(commandsFilesPath)
  const commands = []

  commandsSubDirs.forEach(dir => {
    const slashCommandsTotal = loadCommands(dir, commandsFolderPath, client)
    commands.push(...slashCommandsTotal);
  })

  const rest = new REST().setToken(process.env.BOT_TOKEN);
  deployCommands(rest, commands)
}

function loadCommands(directory, commandsFolderPath, client) {
  const slashCommandsTotal = [];

  const dirPath = path.join(__dirname, commandsFolderPath, directory)
  const commandsDir = readdirSync(dirPath).filter(file => file.endsWith('.js') && file !== 'index.js');

  for (const file of commandsDir) {
    const commandPath = path.join(dirPath, file)

    try {
      const command = require(commandPath);
      if (!command.enabled) {
        console.log(`⚠️  Comando desativado: ${chalk.bold(command.data.name)}`);
        continue;
      }

      if (!command && !command.data?.name && !command.execute) {
        console.warn(`❌ O comando ${chalk.bold(file)} está faltando um "data" ou "execute".`);
      }

      client.slashCommands.set(command.data.name, command);
      slashCommandsTotal.push(command.data.toJSON())
      console.log(`✅ Comando carregado: ${chalk.bold(command.data.name)}`)

    } catch (error) {
      console.error(`❌ Erro ao carregar o comando ${chalk.bold(file)}:\n`, error);
    }
  }

  return slashCommandsTotal;
}

async function deployCommands(rest, commands) {
  console.log(chalk.blue(`🔄️ Atualizando ${commands.length} comandos de aplicação (/).`));

  const guildId = process.env.BOT_GUILD
  if (!guildId) throw new Error('A guilda não está definida no arquivo env.')

  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, guildId),
      { body: commands }
    )

    console.log(chalk.yellow(`📦 Um total de ${commands.length} comandos foram carregados.`))
  } catch (error) {
    if(error.code === 20012) {
      console.error('Houve uma falha ao carregar os comandos, verifique se o id do bot e da guilda estão corretos.')
    } else {
      console.error(`Falha ao carregar comandos: `, error);
    }
    
    throw error;
  }
}

module.exports = loadSubDirsCommands;
