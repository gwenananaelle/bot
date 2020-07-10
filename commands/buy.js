const users = require('../users.json')

module.exports = {
	name: 'buy',
	aliases: [''],
	cooldown: 5,
	description: '',
	args: true,
	usage: '<number>',
	execute(message, args) {
		const username = message.author.username;
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		argument = parseInt(args[0], 10);
		if (!argument) {
			return message.channel.send('you must add a number');
		}
		const found = users.find(element => element.name === username);
		if (!found) {
			users.push({
				'name': username,
				'quantity': argument
			})
		} else {
			found.quantity = found.quantity + argument
		}
		console.log(found);
		console.log(users);
		console.log(users[users.length - 1]);
		const user = found === undefined ? users[users.length - 1] : found;
		message.channel.send(`tu as acheté : ${argument} chocogrenouilles, tu en as maintenant : ${user.quantity}`);
	}
}