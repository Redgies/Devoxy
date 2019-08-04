
const i18n = require('../sI18n');
const misc = require('../sMisc');
const time = require('./sTime');  

class ChatSingleton {
	constructor () {
		mp.events.add('playerChat', (player, message) => {
			if(!message) return player.notify("Veuillez entrer un message.");
			this.sayRP(player, message);
			misc.log.debug(`${player.name}[${player.id}]: ${message}`);
		});

		mp.events.addCommand({
			'me' : (player, fullText) => {
				if(!fullText) return player.notify("Veuillez entrer un message.");
				this.sayME(player, fullText);
			}, 
			
			'do' : (player, fullText) => {
				if(!fullText) return player.notify("Veuillez entrer un message.");
				this.sayDO(player, fullText);
			}, 

			'b' : (player, fullText) => {
				if(!fullText) return player.notify("Veuillez entrer un message.");
				this.sayLocalOOC(player, fullText);
			}, 

			'ooc' : (player, fullText) => {
				if(!fullText) return player.notify("Veuillez entrer un message.");
				mp.players.broadcast(`[${time.getTime()}] [OOC] ${player.name}: ${fullText}`);
				misc.log.debug(`${player.name} ${fullText}`);
			}, 

			'pm' : (player, fullText) => {
				console.log(fullText[1]);
				console.log(fullText[2]);
				console.log(fullText[1].length);
				console.log(fullText[2].length);
				if(fullText.length < 3 || !fullText[1].length || !fullText[2].length)
					return player.notify("Utilisez /pm id message");
			
				const recipient = this.findPlayerByIdOrNickname(fullText[1]);
				if(!recipient) 
					return player.notify("Ce joueur n'est pas connecté.");
			
				const message = fullText.slice(2).join(' ');
				const str = `<b>[PM] ${player.name}[${player.id}] -> ${recipient.name}[${recipient.id}]</b>: ${message}`;
			
				recipient.outputChatBox(str);
				player.outputChatBox(str);
			},

			'test' : (player, fullText) => {
				player.tsetVariable('test', player.name);
				player.call("disablePlayerRegeneration", [player]);
				player.notify("test");
			},
			
		});
	}

	findPlayerByIdOrNickname(playerName) {
		let foundPlayer = null;
	
		// If playerName is numberic
		if (playerName == parseInt(playerName)) {
			// search player by ID
			foundPlayer = mp.players.at(playerName);
		}
	
		// or search player by nickname
		if (!foundPlayer) {
			mp.players.forEach((_player) => {
			if (_player.name === playerName) {
				foundPlayer = _player;
			}
			});
		}
	
		return foundPlayer;
	}

	getColorInRange(color, dist) {
		if (color === 'white') return this.getWhiteColor(dist);
		else if (color === 'purple') return this.getPurpleColor(dist);
	}

	getWhiteColor(dist) {
		if (dist >= 0 && dist < 2) return '#ffffff';
		else if (dist >= 2 && dist < 4) return '#cecece';
		else if (dist >= 4 && dist < 6) return '#afafaf';
		else if (dist >= 6 && dist < 8) return '#919191';
		else if (dist >= 8 && dist < 10) return '#727272';
	}

	getPurpleColor(dist) {
		if (dist >= 0 && dist < 2) return '#c2a2da';
		else if (dist >= 2 && dist < 4) return '#a58bba';
		else if (dist >= 4 && dist < 6) return '#8a749b';
		else if (dist >= 6 && dist < 8) return '#6e5d7c';
		else if (dist >= 8 && dist < 10) return '#53465e';
	}

	sayRP(player, text, anon = false) {
		mp.players.forEachInRange(player.position, 10, (client) => {
			const dist = client.dist(player.position);
			const color = this.getColorInRange("white", dist);
			const currentTime = misc.getTime();
			if (anon) {
				client.outputChatBox(`!{${color}}[${currentTime}] ${i18n.get('sChat', 'someone', player.lang)}: ${text}`);
			}
			else {
				client.outputChatBox(`!{${color}}[${currentTime}] ${player.name}[${player.id}]: ${text}`);
			}
		});
	}

	sayLocalOOC(player, text, anon = false) {
		mp.players.forEachInRange(player.position, 10, (client) => {
			const dist = client.dist(player.position);
			const color = this.getColorInRange("white", dist);
			const currentTime = misc.getTime();
			if (anon) {
				client.outputChatBox(`!{#dddddd}[${currentTime}] (( ${i18n.get('sChat', 'someone', player.lang)}: ${text} ))`);
			}
			else {
				client.outputChatBox(`!{#dddddd}[${currentTime}] (( ${player.name}[${player.id}]: ${text} ))`);
			}
		});
	}

	sayME(player, text, anon = false) {
		mp.players.forEachInRange(player.position, 10, (client) => {
			const dist = client.dist(player.position);
			const color = this.getColorInRange("purple", dist);
			const currentTime = misc.getTime();
			if (anon) {
				client.outputChatBox(`!{${color}}[${currentTime}] ${i18n.get('sChat', 'someone', player.lang)}: ${text}`);
			}
			else {
				client.outputChatBox(`!{${color}}[${currentTime}] ${player.name} ${text}`);
			}
			misc.log.debug(`${player.name} ${text}.`);
		});
	}

	sayDO(player, text, anon = false) {
		mp.players.forEachInRange(player.position, 10, (client) => {
			const dist = client.dist(player.position);
			const color = this.getColorInRange("purple", dist);
			const currentTime = misc.getTime();
			if (anon) {
				client.outputChatBox(`!{${color}}[${currentTime}] ${text}`);
			}
			else {
				client.outputChatBox(`!{${color}}[${currentTime}] ${text} | ${player.name}`);
			}
			misc.log.debug(`${text} | ${player.name}.`);
		});
	}
}
const chat = new ChatSingleton();
module.exports = chat;