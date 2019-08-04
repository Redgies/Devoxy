
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
				mp.players.broadcast(`!{#0984e3}[${time.getTime()}] [OOC] ${player.name} [${player.id}] : ${fullText}`);
				misc.log.debug(`${player.name} ${fullText}`);
			}, 

			'pm' : (player, fullText, arg1, arg2) => {
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /pm id message");
			
				const recipient = this.findPlayerByIdOrNickname(arg1);
				if(!recipient) 
					return player.notify("Ce joueur n'est pas connecté.");
				if(recipient.id == player.id) 
					return player.notify("Vous ne pouvez pas vous PM.");

				const currentTime = misc.getTime();
			
				const message = arg2;
				const str = `!{#0984e3}[${currentTime}] [PM] à ${recipient.name} [${recipient.id}] : ${message}`;
				player.outputChatBox(str);

				const str2 = `!{#0984e3}[${currentTime}] [PM] de ${player.name} [${player.id}] : ${message}`;
				recipient.outputChatBox(str2);
			},

			'tphere' : (player, fullText, arg1) => {
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /thpere id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target) 
					return player.notify("Ce joueur n'est pas connecté.");
				if(target.id == player.id) 
					return player.notify("Vous ne pouvez pas vous téléporter.");

				const pos = player.position;

				target.position = new mp.Vector3(pos.x, pos.y, pos.z);

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous avez téléporté ${target.playername} à vous.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.playername} vous a téléporté à lui.`);

				misc.log.debug(`${player.name} teleported ${target.playername} to him.`);
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