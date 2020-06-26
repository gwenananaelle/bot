const Discord = require('discord.js')
const fs = require('fs');
const {
	prefix,
	token
} = require('./config.json');

const bot = new Discord.Client()
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
	console.log(`\`${command.name}\` has been added`);
}
bot.on('ready', function () {
	console.log("yop")
})

bot.on('message', message => {
	console.log(`start with prefix ${message.content.startsWith(prefix)}`);
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	console.log(args);
	const commandName = args.shift().toLowerCase();
	console.log(commandName);
	console.log(`bot has commandName ${bot.commands.has(commandName)}`);
	if (!bot.commands.has(commandName)) return;
	const command = bot.commands.get(commandName);
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name}\``;
		}

		return message.channel.send(reply);
	}

	try {
		console.log(commandName);
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
bot.login(token);