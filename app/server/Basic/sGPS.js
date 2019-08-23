const moneyAPI = require('./Money/sMoney');
const business = require('../Business/sBusiness');
const misc = require("../sMisc");


class GPS {
	constructor () {
		mp.events.addCommand({
			"donnerpos" : (player, fullText, arg1) => {
				if(!arg1) return player.notify("~r~Utilisez /donnerpos id");

				let target = misc.findPlayerByIdOrNickname(arg1);
				if(!target) return player.notify("~r~Ce joueur n'est pas connecté.");
				
				const pos = player.position;
				let x, y;

				x = pos.x;
				y = pos.y;

				this.createRoute(target, x, y);

				mp.players.forEachInRange(player.position, 10, (client) => {
					const dist = client.dist(player.position);
					const color = '#c2a2da';
					const currentTime = misc.getTime();
					client.outputChatBox(`!{${color}}[${currentTime}] ${player.name} envoie sa position depuis son téléphone`);
					misc.log.debug(`${player.name} envoie sa position depuis son téléphone.`);
					
				});

				target.notify(`${player.name} vous a envoyé sa position.`);
				player.notify(`Vous avez envoyé votre position à ${target.name}.`);
			}
		});			
		mp.events.add('sGPS-CreateRoute', (player, str) => {
			const d = JSON.parse(str);
			let x, y;
			if (d.name === "Hospital") {
				x = -498.184;
				y = -335.741;
			}
			if (d.name === "Prison") {
				x = 1846.283;
				y = 2585.906;
			}
			if (d.name === "Orange Collector") {
				x = 405.676;
				y = 6526.119;
			}
			if (d.name === "Clickin Bell Delivery Courier") {
				x = -136.757;
				y = 6198.713;
			}
			if (d.name === "ATM") {
				const pos = moneyAPI.getNearestATM(player.position);
				x = pos.x;
				y = pos.y;
			}
			if (d.name === "Gas Station" || d.name === "Clothing Shop" || d.name === "Barber Shop") {
				const pos = business.getNearestBusiness(d.name, player.position);
				x = pos.x;
				y = pos.y;
			}
			if (d.name === "Business") {
				const pos = business.getBusinessPositionById(d.id);
				if (!pos) return;
				x = pos.x;
				y = pos.y;
			}
			if (d.name === "Find Vehicle") {
				const pos = mp.vehicles.at(d.id).position;
				if (!pos) return;
				x = pos.x;
				y = pos.y;
			}
			this.createRoute(player, x, y);
		});

	}

	createRoute(player, x, y) {
		player.call("cGPS-CreateRoute", [x, y]);
	}

}
new GPS();
