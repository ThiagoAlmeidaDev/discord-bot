const { EmbedBuilder, MessageFlags } = require('discord.js');
const chalk = require('chalk');
const settings = require('@config/settings');

const currentDateTime = new Date().toLocaleString('pt-BR');

module.exports = async (interaction, error) => {
    const commandName = interaction.commandName || "Nenhum";
    const subCommandName = interaction.options?._subcommand || "Nenhum";
    const interactionType = interaction.componentType;
    const userName = interaction.user.username;
    const userId = interaction.user.id;

    console.error(
        `${chalk.redBright("[ERRO]")} Comando: ${commandName} | Subcomando: ${subCommandName} | Tipo da interação: ${interactionType}\n` +
        `${chalk.yellowBright(`Detalhes:`)} ${chalk.bold(currentDateTime)} — ${userName} (${userId})\n`,
        error
    );

    const embed = new EmbedBuilder()
        .setDescription(`❌ **${interaction.user.username}**, alguma coisa ocorreu ao processar sua solicitação, pedimos desculpas!\n-# Se o problema acontecer novamente, contate o meu criador.`)
        .setColor(settings.colors.default);

    return interaction.replied || interaction.deferred 
        ? interaction.followUp({ embeds: [embed], components: [], flags: MessageFlags.Ephemeral })
        : interaction.reply({ embeds: [embed], components: [], flags: MessageFlags.Ephemeral });
};
