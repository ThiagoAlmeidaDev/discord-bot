const chalk = require('chalk');

function validateConfiguration(envFile) {
    const allVariables = ['BOT_TOKEN', 'BOT_ID', 'BOT_GUILD', 'OWNER_ID']

    const missingVariables = allVariables.filter(variable => !process.env[variable])
    
    if(missingVariables.length > 0) {
        console.error(chalk.bgRedBright(`[ENV]${chalk.reset(` As seguintes variáveis de ambiente não estão definidas no arquivo ${envFile}: `)}`))
        
        missingVariables.forEach(variable => {
            console.error(chalk.red(`- ${variable}`));
        })

        console.warn(chalk.yellow('\nDevido a isso, o processo de inicialização será interrompido.'));
        process.exit(1);
    }
}

module.exports = { validateConfiguration };