const business = require('./sBusiness');
const misc = require('../sMisc');
const i18n = require('../sI18n');



class Ammunation extends business {
	
	setLocalSettings() {
		this.buyerColshape.gasStationId = this.id;
		this.blip.model = 556;
		this.blip.name = `Ammunation`;
	}

	async setMargin(ownerId, newMargin) {
		await super.setMargin(ownerId, newMargin);
		this.updateFuelPrice();
	}

	openBuyerMenu(player) {
        if (player.vehicle) return;
        
        player.notify("sdfsdfd");
		// const cars = JSON.stringify(this.getCarsCanFillUp());
	
		// let execute = `app.id = ${this.id};`;
		// execute += `app.margin = ${this.margin};`;
		// execute += `app.updatePriceForLitre();`;
		// execute += `app.updateCars('${cars}');`
		
		// player.call("cGasStation-OpenBuyerMenu", [player.lang, execute, this.camData]);
		// misc.log.debug(`${player.name} enter a gas station menu`);
	}	

}

mp.events.add({
	"sGasStation-FillUp" : (player, str) => {
		const id = player.canOpen.businessBuyerMenu;
		if (!id) return;
		const shop = business.getBusiness(id);
		shop.fillUpCar(player, str);
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