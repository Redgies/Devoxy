
const business = require('./sBusiness');
const misc = require('../sMisc');
const vehicleSingletone = require('../Basic/Vehicles/sVehicleSingletone');
const vehiclesDataSingleton = require('../Basic/Vehicles/sVehiclesData');
const i18n = require('../sI18n');



class CarDealership extends business {
    constructor(d) {
		super(d);
		this.newCarCoord = d.newCarCoord;
    }

	async buyNewCar(player, model) {
		const carPrice = vehiclesDataSingleton.getPrice(model);
		if (!carPrice) return;
		const shopTax = misc.roundNum(carPrice * this.margin / 400);
		const fullPrice = carPrice + shopTax;
		const canBuy = await player.changeMoney(-fullPrice);

		const tunning = [
			{mod: 0, value: -1},
			{mod: 1, value: -1},
			{mod: 2, value: -1},
			{mod: 3, value: -1},
			{mod: 4, value: -1},
			{mod: 5, value: -1},
			{mod: 6, value: -1},
			{mod: 7, value: -1},
			{mod: 8, value: -1},
			{mod: 9, value: -1},
			{mod: 10, value: -1},
			{mod: 11, value: -1},
			{mod: 12, value: -1},
			{mod: 13, value: -1},
			{mod: 14, value: -1},
			{mod: 15, value: -1},
			{mod: 18, value: -1},
			{mod: 22, value: -1},
			{mod: 23, value: -1}
		];

		if (!canBuy) return;
		await this.addMoneyToBalance(shopTax);
		await vehicleSingletone.saveNewCar(player, model, this.newCarCoord, false, tunning);

		player.notify(`~g~${i18n.get('basic', 'success', player.lang)}`);
		misc.log.debug(`${player.name} bought a vehicule ${model} for $${fullPrice}`);
	}
	
}
module.exports = CarDealership;

mp.events.add({
	"sCarDealership-BuyCar" : (player, str) => {
		const d = JSON.parse(str);
		const shop = business.getBusiness(d.id);
		shop.buyNewCar(player, d.model);
	},
});