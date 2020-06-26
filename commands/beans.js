const JellyBeans = require('../jellybeans.json')
const Canvas = require('canvas');

module.exports = {
	name: 'beans',
	description: 'eat a jellybean',
	args: false,
	execute(message, args) {
		console.log('command has been executed');

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		message.channel.send('miam ! c\'est un dragée ' + JellyBeans[getRandomInt(JellyBeans.length)].flavor);
	}
}