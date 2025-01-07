const { readdirSync, existsSync } = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadEvent(eventFolder, fileName) {
  try {
    const event = require(`${eventFolder}/${fileName}`);
    if (typeof event === 'function') {
      return event;
    } else {
      return { handler: null, status: 'error', error: 'Não exporta uma função' }
    }
  } catch (error) {
    return { fileName, status: 'error', error: error }
  }
}

function registerEvent(client, event, eventName) {
  if (event && event.status === 'error') {
    console.log(`❌ Evento ${chalk.bold(eventName)} sofreu erro:`, event.error)
    return;
  }

  client.on(eventName, event.bind(null, client));
  console.log(`✅ Evento carregado: ${chalk.bold(eventName)}`)
}

function loadEvents(client) {
  const eventFolderPath = '../listeners';
  const eventFilesPath = path.resolve(__dirname, eventFolderPath);
  if (!existsSync(eventFilesPath)) {
    throw new Error(`O diretório da pasta de eventos ${eventFilesPath} não existe.`);
  }

  const eventFiles = readdirSync(eventFilesPath).filter(file => file.endsWith('.js') && file !== 'index.js');

  eventFiles.forEach(file => {
    const event = loadEvent(eventFolderPath, file);
    const eventName = file.split('.')[0];
    registerEvent(client, event, eventName);
  })
}

module.exports = loadEvents;