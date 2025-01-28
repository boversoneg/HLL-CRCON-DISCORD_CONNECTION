## License
This code is under MIT License. More can be found [there](https://opensource.org/license/mit). Please respect author and do not edit embed footers where author is placed.

## Requirements
- Node.js (Tested on v20.17.0)
- Discord BOT token (Get it on [Discord Developers Portal](https://discord.com/developers/applications))
- CRCON Api Key (Tutorial how to get one can be found [there](https://github.com/MarechJ/hll_rcon_tool/wiki/Developer-Guides-%E2%80%90-CRCON-API))
- MySQL Database

## Installation
1. Upload mysql table from `MySQL` folder into your database.
2. Upload files from Bot folder into your machine or local computer
3. Using command prompt go into your bot folder (`cd <your-folder-name-goes-there>`)
4. Install BOT packages using `npm i` command in your command prompt
5. Create your `.env` file and complete the data using next step boilerplate
6. Deploy slash commands into your guild using `node deploy-commands.js` command
7. **(Optional)** Change your Bot strings language in `Bot/stringsTranslation.js` file by changing variable of `defaultLanguage`. Make sure Bot does support your language.
8. Turn on your bot using `node index.js` command

## .env File structure
Your `.env` file should look like this:
```
TOKEN=
clientId=
guildId=

CRCONPanelURL=
CRCONAPIKey=

mysqlHOST=
mysqlUSER=
mysqlPASS=
mysqlDATABASE=
```

Complete the data using those parameters:
- **Token** - Your Discord BOT token
- **clientId** - Your Discord BOT client ID
- **guildId** - Your Discord server guild ID
- **CRCONPanelURL** - URL to your [CRCON](https://github.com/MarechJ/hll_rcon_tool) webpanel
- **CRCONAPIKey** - API Key to CRCON webpanel
- **mysqlHOST** - Your MySQL database host
- **mysqlUSER** - Your MySQL database username
- **mysqlPASS** - Your MySQL database password
- **mysqlDATABASE** - Your MySQL database name

## Translating the bot
You can contribute as your country translator. To do so, simply go to `Bot/stringsTranslation.js` file, and follow already created strings, any other unique variables and so can be found there as a code notes.

## Plugins installation
Plugins should be uploaded into `extensions` folder in Bot's folder. For now there is 3 supported plugins types: `event`, `command` and `button`.<br />
After installing extension with type `command` you have to redeploy commands using `node deploy-commands.j` command in command prompt, for events and buttons just restart the bot.<br />
Examples of all 3 extension types can be found in `Bot/extensions` folder. Feel free to contribute and create such a nice extensions for bot!
