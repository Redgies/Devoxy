const business = require('./sBusiness');
const misc = require('../sMisc');
const i18n = require('../sI18n');


class Ammunation extends business {
	
	setLocalSettings() {
		this.buyerColshape.gasStationId = this.id;
		this.blip.model = 556;
		this.blip.name = `Ammunation`;
    }

    async buyNewWeapon(player, hash, price) {
		const shopTax = misc.roundNum(parseInt(price) * this.margin / 400);
		const fullPrice = parseInt(price) + shopTax;
		const canBuy = await player.changeMoney(-fullPrice);

		if (!canBuy) return;
        await this.addMoneyToBalance(shopTax);
        
        player.setWeapon(parseInt(hash), 15);

		player.notify(`~g~${i18n.get('basic', 'success', player.lang)}`);
		misc.log.debug(`${player.name} bought a vehicule ${model} for $${fullPrice}`);
    }
    
    async buyNewAmmo(player, hash, price) {
		const shopTax = misc.roundNum(parseInt(price) * this.margin / 400);
		const fullPrice = parseInt(price) + shopTax;
		const canBuy = await player.changeMoney(-fullPrice);

		if (!canBuy) return;
        await this.addMoneyToBalance(shopTax);
        
        player.setWeaponAmmo(parseInt(hash), +15);

		player.notify(`~g~${i18n.get('basic', 'success', player.lang)}`);
		misc.log.debug(`${player.name} bought a vehicule ${model} for $${fullPrice}`);
	}
    

	async setMargin(ownerId, newMargin) {
		await super.setMargin(ownerId, newMargin);
		this.updateFuelPrice();
	}

	openBuyerMenu(player) {
        if (player.vehicle) return;
        
		let execute = `app.id = ${this.id};`;
		execute += `app.margin = ${this.margin};`;

		player.call("cAmmunations-OpenBuyerMenu", [player.lang, execute]);
		misc.log.debug(`${player.name} enter ammunation`);
	}	

}

mp.events.add({
	"sAmmunations-BuyWeapon" : (player, str) => {
		const d = JSON.parse(str);
		const shop = business.getBusiness(d.id);
		shop.buyNewWeapon(player, d.hash, d.price);
    },
	"sAmmunations-BuyAmmo" : (player, str) => {
		const d = JSON.parse(str);
		const shop = business.getBusiness(d.id);
		shop.buyNewAmmo(player, d.hash, d.price);
	},
});


async function loadShops() {
	const d = await misc.query("SELECT * FROM business INNER JOIN ammunations ON business.id = ammunations.id");
	for (let i = 0; i < d.length; i++) {
		const shop = new Ammunation(d[i]);
		// shop.createFillingColshape();
	}
}
loadShops();


mp.events.addCommand({
	'createammunation' : async (player, enteredprice) => {
		if (player.adminLvl < 3) return;
		const id = business.getCountOfBusinesses() + 1;
		const coord = misc.getPlayerCoordJSON(player);
		const price = Number(enteredprice.replace(/\D+/g,""));
		const query1 = misc.query(`INSERT INTO business (title, coord, price) VALUES ('Ammunation', '${coord}', '${price}');`);
		const query2 = misc.query(`INSERT INTO ammunations (id) VALUES ('${id}');`);	
		await Promise.all([query1, query2]);
		player.outputChatBox("!{#4caf50} Ammunation successfully created!");
	},	
});

/* 

INSERT INTO business (title, coord, price) VALUES ('Ammunation, '{"x":24.146728515625,"y":-1105.6436767578125,"z":29.797008514404297,"rot":149.843994140625,"dim":0}', '500')


How to add new gas station:

1. /creategasstation [price]
Go into business table and get the latest id

2. /setbusbuyermenu [id]

Restart server

3. /setgasstationfillingpos [id] [radius]

4. /setgasstationcamdata [id] [viewangle]

*/