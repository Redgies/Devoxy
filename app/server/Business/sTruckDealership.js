
const business = require('./sBusiness');
const misc = require('../sMisc');
const i18n = require('../sI18n');
const carDealership = require('./sCarDealership');



class TruckDealership extends carDealership {
	
	setLocalSettings() {
		this.blip.model = 635;
		this.blip.name = `Concessionnaire Poids Lourd`;
		this.blip.color = 4;
	}

	openBuyerMenu(player) {
		if (player.vehicle) return;
		let execute = `app.id = ${this.id};`;
		execute += `app.margin = ${this.margin};`;

		player.call("cTruckDealership-OpenBuyerMenu", [player.lang, execute]);
		misc.log.debug(`${player.name} enter a truck dealership menu`);
	}
	
}

async function loadShops() {
	const d = await misc.query("SELECT * FROM business INNER JOIN truckdealership ON business.id = truckdealership.id");
	for (let i = 0; i < d.length; i++) {
		new TruckDealership(d[i]);
	}
}
loadShops();


mp.events.addCommand({
	'createtruckdealership' : async (player, enteredprice) => {
		if (player.adminLvl < 1) return;
		const id = business.getCountOfBusinesses() + 1;
		const coord = misc.getPlayerCoordJSON(player);
		const price = Number(enteredprice.replace(/\D+/g,""));
		const query1 = misc.query(`INSERT INTO business (title, coord, price) VALUES ('Concessionnaire Poids Lourd', '${coord}', '${price}');`);
		const query2 = misc.query(`INSERT INTO truckdealership (id) VALUES ('${id}');`);	
		await Promise.all([query1, query2]);
		player.outputChatBox("!{#d63031} [ADMIN] Vous avez créé un Concessionnaire Poids Lourd.");
	},	

	'settruckdealernewcarcoord' : async (player, id) => {
		if (player.adminLvl < 1) return;
        if (!player.vehicle) 
            return player.outputChatBox("!{#d63031} [ADMIN] Vous devez être dans un véhicule.");
		const coord = misc.getPlayerCoordJSON(player);
		await misc.query(`UPDATE truckdealership SET newCarCoord = '${coord}' WHERE id = ${id}`);
		player.notify(`~g~${i18n.get('basic', 'success', player.lang)}`);

	},	

});
