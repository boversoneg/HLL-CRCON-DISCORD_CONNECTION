const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { createConnection } = require('mysql');
require('dotenv').config();

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ] });

let mysqlData = {
    host: process.env.mysqlHOST,
    user: process.env.mysqlUSER,
    password: process.env.mysqlPASSWORD,
    database: process.env.mysqlDATABASE
};

let con = createConnection(mysqlData)

con.connect((err) => {
	if (err) throw err;

	console.log('Connected to MySQL database.');
});

client.connection = con;

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.buttons = new Collection();

const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	// Set a new item in the Collection with the key as the button name and the value as the exported module
	if ('data' in button && 'execute' in button) {
		client.buttons.set(button.data.customId, button);
	} else {
		console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if ('name' in event && 'execute' in event) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	} else {
		console.log(`[WARNING] The event at ${filePath} is missing a required "name" or "execute" property.`);
	}
}

client.login(process.env.TOKEN);