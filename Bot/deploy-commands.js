// This code can be found at https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Plugins 
const pluginsPath = path.join(__dirname, 'extensions');
const pluginsFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

for (const file of pluginsFiles) {
	const filePath = path.join(pluginsPath, file);
	const plugin = require(filePath);
	if (('execute' in plugin && 'type' in plugin) && (plugin.type === 'command') && ('data' in plugin)) {
		commands.push(plugin.data.toJSON());
	} else {
		if (plugin.type === 'command') {
			console.log(`[WARNING] The plugin with type command at ${filePath} is missing a required "data" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) and extension (plugin) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) and extension (plugin) commands.`);
		console.log('');
		console.log('If your commands are not translated to language you want to, check if translation is added in stringsTranslation.js file and make sure that your discord server region is correct.');
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
