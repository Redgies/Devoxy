const misc = require('../sMisc');
const clothes = require('../Character/sClothes');
const vehicleSingletone = require('../Basic/Vehicles/sVehicleSingletone');
const GPS = require('../Basic/sGPS');

const factionsList = [];

class Faction {
	constructor(id, name, surname,  ranks, maxRank) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.ranks = ranks;
		this.maxRank = maxRank;

		vehicleSingletone.loadFactionVehicles(this.id);

		this.createFactionEvents();

		factionsList.push(this);
	}

	createFactionEvents() {
		mp.events.add({
            "playerQuit" : (player) => {
				this.setWorking(player, false);
			}, 
		});
			
		mp.events.addCommand({	
 			"invite": (player, fullText, target) => {
                target = misc.findPlayerByIdOrNickname(target);
				if(!target) return;
				
				if(!target.loggedIn) return player.notify("~r~Cette personne n'est pas connecté.");

				if(!this.isInThisFaction(player) || !this.isFactionLeader(player)) return;
                if(!target.loggedIn) return player.notify("~r~Cette personne n'est pas connecté.");
                if(target.faction != 0) return player.notify("~r~Cette personne a déjà une faction.");

				target.faction = this.id;
				target.rank = 1;

				target.call("cFaction-Update", [target.faction]);
				target.setVariable('faction', target.faction);

				let job = this.surname + ' | ' + this.getRank(player);
				target.call("cJob-Update", [job]);

				player.notify(`~g~Vous avez invité ${target.name} dans ${this.name}.`);
				target.notify(`~g~${player.name} vous a invité dans ${this.name}.`);
			},
			"rank": (player, fullText, target, rank) => {
                target = misc.findPlayerByIdOrNickname(target);
				if(!target || !rank) return;
				if(target == player) return;
				if(!target.loggedIn) return player.notify("~r~Cette personne n'est pas connecté.");
				
				if(!this.isInThisFaction(player) || !this.isFactionLeader(player) || !this.isInThisFaction(target)) return;

				target.rank = parseInt(rank);
				target.call("cFaction-Update", [target.faction]);

				let job = this.surname + ' | ' + this.getRank(player);
				target.call("cJob-Update", [job]);

				player.notify(`~g~Vous passez ${target.name} au rang de ${this.ranks[target.rank - 1]}.`);
				target.notify(`~g~${player.name} vous a passé au rang de ${this.ranks[target.rank - 1]}.`);				
			},
			"virer": (player, fullText, target) => {
                target = misc.findPlayerByIdOrNickname(target);
				if(!target) return;
				if(target == player) return;
				if(!target.loggedIn) return player.notify("~r~Cette personne n'est pas connecté.");

				if(!this.isInThisFaction(player) || !this.isFactionLeader(player) || !this.isInThisFaction(target)) return;
			
				this.setWorking(target, false);
				this.changeClothes(target);

				target.faction = 0;
				target.rank = 0;

				let job = 'Aucune faction';
				target.call("cJob-Update", [job]);

				target.call("cFaction-Update", [target.faction]);
				target.setVariable('faction', target.faction);

				player.notify(`~g~Vous virez ${target.name} de la faction.`);
				target.notify(`~g~${player.name} vous a viré de la faction.`);		
			},
			"police" : (player, fullText) => {
				if(fullText.length <= 0) return player.notify("~r~Vous devez saisir un message.");

				for(const p of mp.players.toArray()) {
                    if(p.faction !== 1 || !this.isWorking(p)) continue;
                    
					p.notifyWithPicture("Appel 911", player.name, fullText, "CHAR_CALL911");
				}

				player.notifyWithPicture("Appel 911", "", "Votre message a bien été reçu, nous le traiterons dès que possible.", "CHAR_CALL911");
			},
			"mecano" : (player, fullText) => {
				if(fullText.length <= 0) return player.notify("~r~Vous devez saisir un message.");

				const pos = player.position;
				let x, y;

				x = pos.x;
				y = pos.y;

				for(const p of mp.players.toArray()) {
                    if((p.faction !== 2 && p.faction !== 3) || !this.isWorking(p)) continue;
					
					GPS.createRoute(p, x, y);
					const dist = p.dist(player.position);
					p.notifyWithPicture("Dépannage", player.name, fullText, "CHAR_SOCIAL_CLUB");
					misc.log.debug(`${player.name} appel un mecano`);
				}

				player.notifyWithPicture("Dépannage", "", "Votre message a bien été reçu, nous le traiterons dès que possible.", "CHAR_SOCIAL_CLUB");
			},
			"medic" : (player, fullText) => {
				if(fullText.length <= 0) return player.notify("~r~Vous devez saisir un message.");

				const pos = player.position;
				let x, y;

				x = pos.x;
				y = pos.y;


				for(const p of mp.players.toArray()) {
                    if(p.faction !== 4 || !this.isWorking(p)) continue;
					
					GPS.createRoute(p, x, y);
					const dist = p.dist(player.position);
					p.notifyWithPicture("Médecin", player.name, fullText, "CHAR_SOCIAL_CLUB");
					misc.log.debug(`${player.name} appel un médecin`);
				}

				player.notifyWithPicture("Médecin", "", "Votre message a bien été reçu, nous le traiterons dès que possible.", "CHAR_SOCIAL_CLUB");
			},
		});
	}

	getRank(player) {
		if (!this.isInThisFaction(player)) return;
		return this.ranks[player.rank - 1];
	}

	isInThisFaction(player) {
		if(!player.faction || player.faction !== this.id) return false;
		return true;
	}

	isFactionLeader(player) {
		if(player.rank < this.maxRank - 1) return false;
		return true;
	}

	changeClothes(player) {
		if(this.isWorking(player)) {
			if(player.faction === 1)
				player.resetAllWeapons();
				
			this.setWorking(player, false);
			player.notify("Vous arrêtez votre service.");
			player.armour = 0;
			return clothes.loadPlayerClothes(player);
		}
		player.notify("Vous prenez votre service.");
		this.setWorking(player, true);
		if(player.model === 1885233650) this.changeClothesMan(player);
		else this.changeClothesWoman(player);
	}

	isWorking(player) {
		if(player.working) return true;
		return false;
	}

	setWorking(player, status) {
		player.working = status;
	}
}

module.exports = Faction;

// class faction {
// 	constructor(factionName) {
// 		this.name = factionName;
// 		this.maxRank = 10;
// 		vehicleSingletone.loadFactionVehicles(this.name);
// 		factionsList.push(this);
// 	}

// 	createEvents() {
// 		mp.events.addCommand({		
// 			'invite' : async (player, id) => {
// 				this.invite(player, +id);
// 			},	

// 			'setrank' : async (player, full, id, rank) => {
// 				this.setRank(player, +id, +rank);
// 			},

// 			'uninvite' : async (player, id) => {
// 				this.uninvite(player, +id);
// 			},	
// 		});

// 		mp.events.add({
// 			"playerEnterColshape" : (player, shape) => {
// 				if (!player.loggedIn || !this.isInThisFaction(player) || shape !== this.clothingShape) return;
// 				player.faction.canChangeClothes = true;
// 				player.notify(`${i18n.get('basic', 'pressE', player.lang)} ${i18n.get('sFaction', 'changeClothes', player.lang)}`);
// 			},
		
// 			"playerExitColshape" : (player, shape) => {
// 				if (!player.loggedIn || !this.isInThisFaction(player) || shape !== this.clothingShape) return;
// 					player.faction.canChangeClothes = false;
// 			},
		
// 			"sKeys-E" : (player) => {
// 				if (!player.loggedIn || !this.isInThisFaction(player) || !player.faction.canChangeClothes) return;
// 				this.changeClothes(player);
// 			},
// 		});
// 	}

// 	createClothingShape(pos) {
// 		this.clothingShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
// 		this.clothingMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
// 		{
// 			color: [255, 255, 0, 15],
// 			visible: false,
// 		});
// 	}

// 	savePlayerData(player) {
// 		if (!player) return;
// 		misc.query(`UPDATE usersFaction SET name = '${player.faction.name}', rank = '${player.faction.rank}', info = '${JSON.stringify(player.faction.info)}' WHERE id = '${player.guid}'`);
// 	}

// 	updateClothingMarker(player) {
// 		if (this.isInThisFaction(player)) this.clothingMarker.showFor(player);
// 		else this.clothingMarker.hideFor(player);
// 	}

// 	changeClothes(player) {
// 		if (this.isWorking(player)) {
// 			this.setWorking(player, false);
// 			return clothes.loadPlayerClothes(player);
// 		}
// 		this.setWorking(player, true);
// 		if (player.model === 1885233650) this.changeClothesMan(player); // Dont forget add this method to class
// 		else this.changeClothesWoman(player);  // Dont forget add this method to class
// 	}

// 	isInThisFaction(player) {
// 		if (!player.faction || player.faction.name !== this.name) return false;
// 		return true;
// 	}

// 	isInOtherFaction(player) {
// 		if (player.faction.name && player.faction.name !== this.name) return true;
// 		return false;
// 	}

// 	isDistanceRight(player1, player2, showMessToPlayer2 = false) {
// 		const dist = player1.dist(player2.position);
// 		if (dist && dist < 2) return true;
// 		player1.notify(`~r~${player2.name} ${i18n.get('basic', 'tooFarAway', player1.lang)}!`);
// 		if (showMessToPlayer2) player2.notify(`~r~${player1.name} ${i18n.get('basic', 'tooFarAway', player2.lang)}!`);
// 		return false;
// 	}

// 	isWorking(player) {
// 		if (player.faction.working) return true;
// 		return false;
// 	}

// 	setWorking(player, status) {
// 		player.faction.working = status;
// 	}


// 	setRank(leader, id, value) {
// 		if (!misc.isValueNumber(id) || !misc.isValueNumber(value) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
// 		const player = mp.players.at(id);
// 		if (!player || !this.isInThisFaction(player) || !this.isDistanceRight(leader, player)) return;
// 		player.faction.rank = value;
// 		this.savePlayerData(player);
// 		leader.outputChatBox(`!{0, 225, 0}${i18n.get('sFaction', 'setNewRank', leader.lang)} ${player.name}: ${value}`);
// 		player.outputChatBox(`!{0, 225, 0}${leader.name} ${i18n.get('sFaction', 'changedYourRank', player.lang)} ${value}`);
// 		misc.log.debug(`${leader.name} sets ${player.name} rank to ${value}`);
// 	}

// 	invite(leader, id) {
// 		if (!misc.isValueNumber(id) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
// 		const player = mp.players.at(id);
// 		if (!player || !this.isDistanceRight(leader, player) || this.isInOtherFaction(player)) return;
// 		player.faction = {
// 			name: this.name,
// 			rank: 1,
// 			info: false,
// 		}
// 		this.savePlayerData(player);
// 		player.outputChatBox(`!{0, 225, 0}${leader.name} ${i18n.get('sFaction', 'invited', player.lang)} ${this.name}`);
// 		leader.notify(`~g~${i18n.get('basic', 'success', leader.lang)}!`);
// 		this.updateClothingMarker(player);
// 		misc.log.debug(`${leader.name} invited ${player.name} to ${this.name}`);
// 	}

// 	setAsLeader(admin, id) {
// 		if (admin.adminLvl < 1) return;
// 		const player = mp.players.at(id);
// 		if (!player) return;
// 		player.faction = {
// 			name: this.name,
// 			rank: 10,
// 			info: false,
// 		}
// 		this.savePlayerData(player);
// 		player.outputChatBox(`!{0, 225, 0}${i18n.get('sFaction', 'leader', player.lang)} ${this.name}`);
// 		this.updateClothingMarker(player);
// 		admin.notify(`~g~${i18n.get('basic', 'success', admin.lang)}!`);
// 		misc.log.debug(`${admin.name} sets ${player.name} as a ${this.name} leader`);
// 	}

// 	uninvite(leader, id) {
// 		if (!misc.isValueNumber(id) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
// 		const player = mp.players.at(id);
// 		if (!player || !this.isInThisFaction(player)) return;
// 		player.faction = {
// 			name: false,
// 		};
// 		this.savePlayerData(player);
// 		misc.query(`UPDATE faction SET name = NULL WHERE id = '${player.basic.id}'`);
// 		player.outputChatBox(`!{225, 0, 0}${leader.name} ${i18n.get('sFaction', 'uninvited', player.lang)} ${this.name}`);
// 		leader.notify(`~g~${i18n.get('basic', 'success', leader.lang)}!`);
// 		this.updateClothingMarker(player);
// 		clothes.loadPlayerClothes(player);
// 		misc.log.debug(`${leader.name} uninvited ${player.name} from ${this.name}`);
// 	}

// 	updateLastOfferTime(player) {
// 		player.faction.lastOfferTime = new Date().getTime();
// 	}

// 	getLastOfferTime(player) {
// 		return player.faction.lastOfferTime;
// 	}

// 	setCurrentClient(player, client) {
// 		if (!this.isInThisFaction(player) || !this.isWorking(player)) return false;
// 		const currentTime = new Date().getTime();
// 		const lastOfferTime = this.getLastOfferTime(player);
// 		const time = ((currentTime - lastOfferTime) / 1000).toFixed();

// 		if (lastOfferTime && time < 60) {
// 			player.notify(`${i18n.get('basic', 'wait', player.lang)} ${60 - time} ${i18n.get('basic', 'seconds', player.lang)}`);
// 			return false;
// 		}
// 		this.updateLastOfferTime(player);

// 		player.faction.currentClient = client.id;
// 		client.faction.currentSeller = player.id;
// 		return true;
// 	}

// 	getCurrentClient(player) {
// 		return player.faction.currentClient;
// 	}

// 	getCurrentSeller(client) {
// 		return client.faction.currentSeller;
// 	}

// 	resetCurrentClient(player) {
// 		player.faction.currentClient = false;
// 	}

// 	resetCurrentSeller(client) {
// 		client.faction.currentSeller = false;
// 	}

// 	isSellerClientRight(seller, client) {
// 		const clientSellerId = this.getCurrentSeller(client);
// 		const sellerClientId = this.getCurrentClient(seller);
// 		if (seller.id === clientSellerId && client.id === sellerClientId) return true;
// 		return false;
// 	}


// }
// module.exports = faction;


// async function createNewUser(id) {
// 	await misc.query(`INSERT INTO usersFaction (id, info) VALUES ('${id}', '[]')`);
// }
// module.exports.createNewUser = createNewUser;

mp.events.addCommand({
	"makeleader" : (player, fullText, arg1, arg2) => {
		if(player.adminLvl < 3) return;
		if(!arg1 || !arg2)
			return player.notify("Utilisez /makeleader id faction");

		const target = misc.findPlayerByIdOrNickname(arg1);
		if(!target)
			return player.notify("Ce joueur n'est pas connecté.");

		for (const f of factionsList) {
			if(parseInt(arg2) !== f.id) continue; 

			target.faction = f.id;
			target.rank = f.maxRank;

			target.call("cFaction-Update", [target.faction]);
			target.setVariable('faction', target.faction);

			if(target.faction != 0)
			{
				job = f.surname + ' | ' + f.getRank(target);
			}
			target.call("cJob-Update", [job]);

			const currentTime = misc.getTime();

			player.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] Vous avez passsé ${target.name} leader de la faction ${f.name}.`);
			target.outputChatBox(`!{#d63031}[${currentTime}] [ADMIN] ${player.name} vous a passé leader de la faction ${f.name}.`);
			misc.log.debug(`${player.name} make leader ${f.name} for ${target.name}`);
		}
	},
	"r" : (player, fullText) => {
		if(fullText.length < 1) return;

		const currentTime = misc.getTime();

		for (const f of factionsList) {
			if(f.id !== player.id) continue;
			
			if(player.faction != 0)
			{
				job = f.surname + ' | ' + f.getRank(player);
			}
			player.call("cJob-Update", [job]);
		}
		
		for (const p of mp.players.toArray()) {
			for (const f of factionsList) {
				if(player.faction !== f.id) continue; 
				if((player.faction == p.faction))
				{
					const str = `!{#74b9ff}[${currentTime}] [RADIO] ${f.getRank(player)} | ${player.name} : ${fullText}`;
					p.outputChatBox(str);
				}
			}
		}
	},
});

function getFactionName(player)
{
	for (const f of factionsList) {
		if (f.isInThisFaction(player)) return f.surname + ' | ' + f.getRank(player);
	}
}
module.exports.getFactionName = getFactionName;



async function loadUser(player) {
	// for (const f of factionsList) {
	// 	if (f.isInThisFaction(player)) return f.updateServiceMarker(player);
	// }
}
module.exports.loadUser = loadUser;