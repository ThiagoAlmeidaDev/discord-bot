const commandHandler = require('@interactions/handlers/commandHandler');
const errorHandler = require('@interactions/handlers/errorHandler');

module.exports = async (client, interaction) => {
    if (interaction.user.bot) return;

    try {
        if (interaction.isChatInputCommand()) {
            await commandHandler(client, interaction);
        } 
        // else if (interaction.isStringSelectMenu()) {
        //     await selectMenuHandler(client, interaction);
        // } else if (interaction.isButton()) {
        //     await buttonHandler(client, interaction);
        // } else if (interaction.isModalSubmit()) {
        //     await modalHandler(client, interaction);
        // }
    } catch (error) {
        errorHandler(interaction, error);
    }
};