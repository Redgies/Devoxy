
const i18n = require('../sI18n');
const misc = require('../sMisc');
const Faction = require('../Factions/sFaction.js');
const time = require('./sTime');
const clothes = require('../Character/sClothes');

class ChatSingleton {
	constructor () {
		mp.events.add('playerChat', (player, message) => {
			if(!message) return player.notify("Veuillez entrer un message.");
			this.sayRP(player, message);
			misc.log.debug(`${player.name}[${player.id}]: ${message}`);
		});

		mp.events.addCommand({
			'test' : (player, fullText) => {
				player.playScenario("WORLD_HUMAN_STAND_MOBILE");
			},

			'dim' : (player, fullText) => {
				player.dimension = 0;
				clothes.loadPlayerClothes(player);
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
				mp.players.broadcast(`!{#0984e3}[${time.getTime()}] [OOC]!{#ffffff} ${player.name} [${player.id}] : ${fullText}`);
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
			
				let message = fullText.substr(arg1.length + 1, fullText.length);
				const str = `!{#0984e3}[${currentTime}] [PM]!{#ffffff} à ${recipient.name} [${recipient.id}] : ${message}`;
				player.outputChatBox(str);

				const str2 = `!{#0984e3}[${currentTime}] [PM]!{#ffffff} de ${player.name} [${player.id}] : ${message}`;
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

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez téléporté ${target.name} à vous.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous a téléporté à lui.`);

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

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous vous êtes téléporté à ${target.name}.`);

				misc.log.debug(`${player.name} teleported to ${target.name}.`);
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
						p.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN CHAT]!{#ffffff} ${player.name} [${player.id}] : ${fullText}`);
					}
				}
			}, 

			// 'wep': (player, fullText) => {
			// 	const str = player.weapons.all;

			// 	player.outputChatBox("weapons : " + JSON.stringify(str));
			// },

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
					if(p.adminLvl < 1) continue;
					
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
					p.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN OOC]!{#ffffff} ${player.name} [${player.id}] : ${fullText}`);
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

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez heal ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous a heal.`);
				misc.log.debug(`${player.name} healed ${target.name}.`);
			},

			'guid': (player, fullText, arg1) => {
				if(!arg1)
					return player.notify("Utilisez /guid id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Le GUID de ${target.name} [${target.id}] est ${target.guid}.`);
				misc.log.debug(`GUID of ${target.name} [${target.id}] is ${target.guid}`);
			},

			'phone': (player, fullText) => {
				player.outputChatBox("Votre numéro de téléphone est : " + player.phone);
			},

			'loyauté': (player, fullText) => {
				player.outputChatBox("Vous avez " + player.loyality + " de loyauté.");
			},

			'aduty': (player, fullText) => {
				if(player.adminLvl < 1) return;

				const currentTime = misc.getTime();

				if(player.aduty)
				{
					player.aduty = false;
					player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous n'êtes plus en admin service.`);
					misc.log.debug(`${player.name} left admin mode`);
				}
				else 
				{
					player.aduty = true;
					player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous êtes en admin service.`);
					misc.log.debug(`${player.name} started admin mode`);
				}	
			},
			// 'sap': (player, fullText, arg1, arg2, arg3, arg4) => {
			// 	player.notify("Changement de sappe !");
			// 	player.setClothes(parseInt(arg1), parseInt(arg2), parseInt(arg3), parseInt(arg4));
			// },

			'kill': (player, fullText, arg1) =>	{
				if(player.adminLvl < 1) return;
				if(!arg1)
					return player.notify("Utilisez /kill id");

				const target = this.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.health = 0;

				const currentTime = misc.getTime();
				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez tué ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous a tué.`);
				misc.log.debug(`${player.name} killed ${target.name}`);
			},

			'makevip': (player, fullText, arg1, arg2) => {
				if(player.adminLvl < 3) return;
				if(!arg1 || !arg2)
					return player.notify("Utilisez /makevip id vip");

				const target = this.findPlayerByIdOrNickname(arg1);
					if(!target)
						return player.notify("Ce joueur n'est pas connecté.");

				target.vip = parseInt(arg2);

				const currentTime = misc.getTime();
				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez passsé ${target.name} VIP ${arg2}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous a passé VIP ${arg2}.`);
				misc.log.debug(`${player.name} make vip ${arg2} for ${target.name}`);
			},

			'ban': (player, fullText, arg1, arg2, arg3) => {
				if(player.adminLvl < 2) return;

				if(fullText.length < 3 || !arg1 || !arg2 || !arg3)
					return player.notify("Utilisez /ban id temps (heures) raison");

				const target = misc.findPlayerByIdOrNickname(arg1);
				const raison = fullText.substr((arg1.length + 1) + (arg2.length + 1), fullText.length);

				var start = new Date();
				start = start.setHours(start.getHours() + parseInt(arg2));
				const bantime = Math.floor(start / 1000);

				if(!target)
					return player.notify("~r~Ce joueur n'est pas connecté.");
				if(target.id == player.id)
					return player.notify("~r~Vous ne pouvez pas vous bannir vous même.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();


				const str = `!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez banni ${target.name} pendant ${arg2} heures, raison : ${raison}`;
				player.outputChatBox(str);
				const str2 = `!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${target.name} a été banni pendant ${arg2} heures par ${player.name}, raison : ${raison}`;
				for(const p of onlinePlayers) {
					p.outputChatBox(str2);
				}
				target.addBan(target.guid, raison, bantime, target.socialClub, target.ip);
				target.kick();
				const str3 = `${player.name} banned ${target.name}. reason : ${raison}`;
				misc.log.debug(str3);
			},

			'cloack': (player, fullText) => {
				if(player.adminLvl < 1) return;

				player.cloack = !player.cloack;

				player.alpha = (player.cloack ? 0 : 255);
			},

			'radio': (player, fullText) => {
				player.radioActive = !player.radioActive;

				player.setVariable("radioActive", player.radioActive);
				player.call("cRadio-Update", [player.radioActive]);

				if(player.radioActive)
					return player.notify("Vous avez ~g~activé~w~ votre radio.");
				else 
					return player.notify("Vous avez ~r~désactivé~w~ votre radio.");
			},

			'giveargentsale': (player, fullText, arg1, arg2) => {
				if(player.adminLvl < 3) return;
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /giveargentsale id montant");

				const target = misc.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.giveItem("item_dirty_money", "Argent sale", parseInt(arg2));

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez donné ${arg2} d'argent sale à ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous donné ${arg2} d'argent sale.`);
			},

			'givematos': (player, fullText, arg1, arg2) => {
				if(player.adminLvl < 3) return;
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /givematos id montant");

				const target = misc.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.giveItem("item_matos", "Matos", parseInt(arg2));

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez donné ${arg2} de matos à ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous donné ${arg2} de matos.`);
			},

			'giveweed': (player, fullText, arg1, arg2) => {
				if(player.adminLvl < 3) return;
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /giveweeds id montant");

				const target = misc.findPlayerByIdOrNickname(arg1);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");

				target.giveItem("item_weed", "Weed", parseInt(arg2));

				const currentTime = misc.getTime();

				player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez donné ${arg2} de weed à ${target.name}.`);
				target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous donné ${arg2} de weed.`);
			},

			'vgarer': (player, fullText) => {
				if(player.adminLvl < 1) return;

				let vehicle = player.vehicle;

				if(!vehicle) return player.notify("~r~Vous n'êtes pas dans un véhicule.");

				const obj = {
					x: misc.roundNum(vehicle.position.x, 1),
					y: misc.roundNum(vehicle.position.y, 1),
					z: misc.roundNum(vehicle.position.z, 1),
					rot: misc.roundNum(vehicle.rotation.z, 1),
					dim: vehicle.dimension,
				}
				const f = vehicle.fuel;
				const id = vehicle.guid;
				misc.query(`UPDATE vehicles SET coord = '${JSON.stringify(obj)}', fuel = '${f}', primaryColor = '${JSON.stringify(vehicle.primaryColor)}', secondaryColor = '${JSON.stringify(vehicle.secondaryColor)}', tunning = '${JSON.stringify(vehicle.tunning)}' WHERE id = '${id}'`);

				player.notify("Véhicule garé !");
			},

			'masque': (player, fullText) => {
				clothes.loadPlayerMask(player);
			},

			'matos': (player, fullText, arg1) => {
				if(!player.faction) return;
				if(!arg1) return player.notify("~r~Utilisez /matos <quantité>");

				player.matos = parseInt(arg1);

				player.notify(`Votre prochaine commande sera de ~b~${player.matos} ~w~ matos pour ~g~${player.matos * 150}$.`);
			},

			'cops': (player, fullText) => {
				player.notify(`Il y a actuellement ~r~${player.getCops()}~w~ policiers en services.`);
			},

			'kick': (player, fullText, arg1, arg2) => {
				if(player.adminLvl < 1) return;
				if(fullText.length < 3 || !arg1 || !arg2)
					return player.notify("Utilisez /kick id raison");

				const target = this.findPlayerByIdOrNickname(arg1);
				const raison = fullText.substr(arg1.length + 1, fullText.length);
				if(!target)
					return player.notify("Ce joueur n'est pas connecté.");
				if(target.id == player.id)
					return player.notify("Vous ne pouvez pas vous kicker vous même.");

				const onlinePlayers = mp.players.toArray();
				const currentTime = misc.getTime();


				const str = `!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} Vous avez kické ${target.name}. Raison : ${raison}`;
				player.outputChatBox(str);
				const str1 = `!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${player.name} vous a kické. Raison : ${raison}`;
				target.outputChatBox(str1);
				const str2 = `!{#d63031}[${currentTime}] [ADMIN]!{#ffffff} ${target.name} a été kické par ${player.name}. Raison : ${raison}`;
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
				client.outputChatBox(`!{${color}}[${currentTime}] ${player.name} [${player.id}]: ${text}`);
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