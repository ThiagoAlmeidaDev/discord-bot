module.exports = async function commandHandler(client, interaction) {
    const command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command) {
        return console.error(`Nenhum comando nomeado ${interaction.commandName} foi encontrado.`);
    }

    if (command.ownerOnly && interaction.user.id !== process.env.OWNER_ID) {
        return interaction.reply({ content: 'O código é apenas para o dono.', flags: MessageFlags.Ephemeral });
    }

    try {
        await command.execute(client, interaction);
    } catch (error) {
        throw error;
    }
};
