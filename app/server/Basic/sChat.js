
const i18n = require('../sI18n');
const misc = require('../sMisc');
const graylog = require('../sGraylog');
const time = require('./sTime');  

class ChatSingleton {
	constructor () {
		mp.events.add('playerChat', (player, message) => {
			if(!message) return player.notify("Veuillez entrer un message.");
			this.sayRP(player, message);
			misc.log.debug(`${player.name}[${player.id}]: ${message}`);
		});

		mp.events.addCommand({
			'dim' : (player, fullText) => {
				player.dimension = 0;
				player.notify("Vous avez changé de dimension.");
			},
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
			
				const message = fullText.substr(arg1 + arg1.length);
				const str = `!{#0984e3}[${currentTime}] [PM] à ${recipient.name} [${recipient.id}] : ${message}`;
				player.outputChatBox(str);

				const str2 = `!{#0984e3}[${currentTime}] [PM] de ${player.name} [${player.id}] : ${message}`;
				recipient.outputChatBox(str2);
			},

			'tphere' : (player, fullText, arg1) => {
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /tphere id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");
				if(target.id == player.id)
					return player.notify("Vous ne pouvez pas vous téléporter.");

				const pos = player.position;

				target.position = new mp.Vector3(pos.x, pos.y, pos.z);

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous avez téléporté ${target.name} à vous.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.name} vous a téléporté à lui.`);

				misc.log.debug(`${player.name} teleported ${target.name} to him.`);
			},

			'tpto' : (player, fullText, arg1) => {
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /tpto id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");
				if(target.id == player.id)
					return player.notify("Vous ne pouvez pas vous téléporter.");

				const pos = target.position;

				player.position = new mp.Vector3(pos.x, pos.y, pos.z);

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous vous êtes téléporté à ${target.name}.`);

				misc.log.debug(`${player.name} teleported to ${target.name}.`);
			},

			'tptest' : (player, fullText) => {
				if(player.adminLvl < 1) return;
				
				player.position = new Vector3(-786.8663, 315.7642, 217.6385);
			},

			'admin' : (player, fullText) => {
				if(player.adminLvl < 1) return;
				if(fullText.length < 1) 
					return player.notify("Vous devez écrire un message.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();

				for(const p of onlinePlayers) {
					if(p.adminLvl >= 1) 
					{
						p.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.name} [${player.id}] : ${fullText}`);
					}
				}
			}, 

			'wep': (player, fullText) => {
				const str = player.weapons.all;

				player.outputChatBox("weapons : " + JSON.stringify(str));
			},

			// 'cuff' : (player, fullText) => {
			// 	player.setCuff(true);
			// },
			// 'uncuff' : (player, fullText) => {
			// 	player.setCuff(false);
			// },

			'rapport': (player, fullText) => {
				if(fullText.length < 1) 
					return player.notify("Vous devez écrire un message.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();

				for(const p of onlinePlayers) {
					p.outputChatBox(`!{#fdcb6e}[${currentTime}] [RAPPORT] ${player.name} [${player.id}] : ${fullText}`);
				}
			},

			'aooc': (player, fullText) => {
				if(player.adminLvl < 1) return;
				if(fullText.length < 1) 
					return player.notify("Vous devez écrire un message.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();
	
				for(const p of onlinePlayers) {
					p.outputChatBox(`!{#d63031}[${currentTime}] [ANNONCE] ${player.name} [${player.id}] : ${fullText}`);
				}
			},

			'heal': (player, fullText, arg1) =>	{
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /heal id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.health = 100;

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous avez heal ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.name} vous a heal.`);
				misc.log.debug(`${player.name} healed ${target.name}.`);
			},

			'guid': (player, fullText, arg1) => {
				if(!arg1)
					return player.notify("Utilisez /guid id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Le GUID de ${target.name} [${target.id}] est ${target.guid}.`);
				misc.log.debug(`GUID of ${target.name} [${target.id}] is ${target.guid}`);
			},

			'aduty': (player, fullText) => {
				if(player.adminLvl < 1) return;

				const currentTime = misc.getTime();

				if(player.aduty)
				{
					player.aduty = false;
					player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous n'êtes plus en admin service.`);
					misc.log.debug(`${player.name} left admin mode`);
				}
				else 
				{
					player.aduty = true;
					player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous êtes en admin service.`);
					misc.log.debug(`${player.name} started admin mode`);
				}	
			},

			'sap': (player, fullText, arg1, arg2, arg3, arg4) => {
				player.notify("Changement de sappe !");
				player.setClothes(parseInt(arg1), parseInt(arg2), parseInt(arg3), parseInt(arg4));
			},

			'kill': (player, fullText, arg1) =>	{
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /kill id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.health = 0;

				const currentTime = misc.getTime();
				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous avez tué ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.name} vous a tué.`);
				misc.log.debug(`${player.name} killed ${target.name}`);
			},

			'kick': (player, fullText, arg1, arg2) =>	{
				if(player.adminLvl < 1) return;
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /kick id raison");

				const target = this.findPlayerByIdOrNickname(arg1);
				const raison = fullText.substr(arg1 + arg1.length);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");
				if(target.id == player.id)
					return player.notify("Vous ne pouvez pas vous kicker vous même.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();


				const str = `!{#d63031}[${currentTime}] [ADMIN] Vous avez kické ${target.name}. Raison : ${raison}`;
				player.outputChatBox(str);
				const str1 = `!{#d63031}[${currentTime}] [ADMIN] ${player.name} vous a kické. Raison : ${raison}`;
				target.outputChatBox(str1);
				const str2 = `!{#d63031}[${currentTime}] [ADMIN] ${target.name} a été kické par ${player.name}. Raison : ${raison}`;
				for(const p of onlinePlayers) {
					p.outputChatBox(str2);
				}
				target.kick();
				const str3 = `${player.name} kicked ${target.name}. Raison : ${raison}`;
				misc.log.debug(str3);

			},
		});
	}

	findPlayerByIdOrNickname(playerName) {
		let foundPlayer = null;
	
		if(playerName == parseInt(playerName)) {
			foundPlayer = mp.players.at(playerName);
		}
		if(!foundPlayer) {
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
				client.outputChatBox(`!{#dddddd}[${currentTime}] (( ${player.name} [${player.id}]: ${text} ))`);
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
			graylog.log(`/me ${player.name} ${text}.`, `/me ${player.name} ${text}.`, '/me');
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