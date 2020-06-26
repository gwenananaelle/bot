const ChocoFrogs = require('../chocofrogs.json')
const Canvas = require('canvas');
const Discord = require('discord.js')

module.exports = {
	name: 'frogs',
	aliases: ['chocogrenouille', 'grenouille'],
	cooldown: 5,
	description: 'eat a chocofrog',
	args: false,
	async execute(message, args) {
		console.log('command has been executed');

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		const randomInt = getRandomInt(ChocoFrogs.length);

		const cardName = ChocoFrogs[randomInt].name;
		const cardDescription = ChocoFrogs[randomInt].description;
		const cardTitle = ChocoFrogs[randomInt].title;
		const cardDate = ChocoFrogs[randomInt].date;
		const cardNumber = ChocoFrogs[randomInt].number;

		const canvas = Canvas.createCanvas(500, 500);
		const drawMultilineText = require('canvas-multiline-text');
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('./chocogrenouille.png').catch(
			(err) => {
				console.log(err);
			});

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.font = '18px serif';
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.fillText(cardNumber, 250, 70, 75);
		ctx.fillText(cardName, 250, 200, 140);
		ctx.fillText(cardTitle, 250, 215, 150);
		ctx.fillText(cardDate, 250, 230, 150);

		drawMultilineText(
			ctx,
			cardDescription, {
				rect: {
					x: 250,
					y: 240,
					width: 170,
					height: 350
				},
				font: 'serif',
				verbose: true,
				lineHeight: 1.4,
				minFontSize: 9,
				maxFontSize: 24
			});

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'carteChocoGrenouille.png');
		// message.channel.send(`carte chocogrenouille `, attachment);
		message.channel.send('Cool ! une carte chocogrenouille ' + cardName, attachment);
	}
}