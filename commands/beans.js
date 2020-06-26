const JellyBeans = require('../jellybeans.json')
const Canvas = require('canvas');
const Discord = require('discord.js')

module.exports = {
	name: 'beans',
	aliases: ['jellybean', 'dragée'],
	cooldown: 5,
	description: 'eat a jellybean',
	args: false,
	async execute(message, args) {
		console.log('command has been executed');

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		const randomInt = getRandomInt(JellyBeans.length);
		const flavor = JellyBeans[randomInt].flavor;
		const color = JellyBeans[randomInt].color;

		const canvas = Canvas.createCanvas(500, 500);
		const ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(250, 250, 200, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		const background = await Canvas.loadImage('./bean.png').catch(
			(err) => {
				console.log(err);
			});
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.font = '32px serif';
		ctx.fillStyle = '#CA1417';
		ctx.textAlign = 'center';
		ctx.fillText(flavor, 250, 280, 100);


		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'dragee.png');
		message.channel.send('miam ! c\'est un dragée ' + flavor, attachment);
	}
}