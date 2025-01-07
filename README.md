<h1 align="center">
   <br>
      <a href="https://github.com/ThiagoAlmeidaDev"><img src="./assets/discord_logo.png" height="200" alt="Discord.js v14 Bot"></a>
   <br>
      Discord.js v14 Bot
   <br>
</h1>

<p align="center">Estrutura simples para um bot do Discord.</p>

<br>
   <p align="center">
      <a href="#requisitos">Pré-requisitos</a> • <a href="#instalando">Instalando</a> • <a href="#links">Links</a>
   </p>
<br>

---

## Links

- [Lista de Comandos](https://github.com/ThiagoAlmeidaDev/discord-bot/tree/main/src/commands)
- [Repositório no GitHub](https://github.com/ThiagoAlmeidaDev)

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/en/) v21.6.1 ou superior
- [Git](https://git-scm.com/downloads)

## Instalação
### Adicionando o bot ao servidor

Use o link abaixo, substituindo ### pelo **ID do bot**:
```
https://discordapp.com/oauth2/authorize?&client_id=###&scope=bot&permissions=8
```

> [!IMPORTANT]  
> Configure corretamente as variáveis de ambiente no arquivo `.env` para evitar problemas na execução.

### Clonando o projeto e instalando dependências

1. Abra o terminal e execute os seguintes comandos:
```
   git clone https://github.com/ThiagoAlmeidaDev/discord-bot.git  
   cd discord-bot  
   npm install  
```

2. Configure as variáveis de ambiente:
   - Renomeie o arquivo .env.example para .env.production e preencha os campos necessários com as informações do bot oficial.
   - (Opcional) Para um ambiente de testes, crie um arquivo .env.development com as credenciais do bot de teste.

3. Inicie o bot:
   - Para o bot oficial: npm run start:prod
   - Para o bot de testes: npm run start:dev

4. Verifique o terminal para garantir que o bot esteja online e funcionando corretamente no servidor.
