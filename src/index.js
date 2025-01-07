require('module-alias/register');

const { Client, Collection, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv')

const loadHandlers = require('@handlers/loadHandlers');
const startBot = require('@init/startBot');
const { validateConfiguration } = require('@init/validateEnv');
const loadEnvironment = require('@init/loadEnv');
const handleGlobalErrors = require('@init/errorHandler');

// Inicializar o cliente Discord
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.slashCommands = new Collection();

initializeBot();

async function initializeBot() {
    const envFile = await loadEnvironment(dotenv);
    validateConfiguration(envFile);

    try {
        await loadHandlers(client);
        await startBot(client);
        await handleGlobalErrors();
    } catch (error) {
        console.error('[ERRO] Falha na inicialização do bot:\n', error);
        process.exit(1);
    }
}