const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const settings = require('@config/settings.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('📦 Veja o ping atual do bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    ownerOnly: false,
    enabled: true,
    async execute(client, interaction) {
        const { ping } = client.ws;

        const sent = await interaction.reply({ content: 'Pingando... 🏓', flags: MessageFlags.Ephemeral })
        sent.edit(`Latência do ping: **${sent.createdTimestamp - interaction.createdTimestamp}ms**\nLatência do WebSocket: **${ping}ms**\n-# A latência média e a última latência registrada.`);
    }
};