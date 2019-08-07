const misc = require('../sMisc');
const faction = require('./sFaction');

const factionData = {
    id: 1,
    name: "Los Santos Police Departement",
    ranks: [
        "Cadet",
        "Officier", 
        "Officier supérieur",
        "Lieutenant",
        "Capitaine",
        "Commissaire",
    ],
    maxRank: 6,
    servicePoint: {
        x: 458.955,
        y: -992.82,
        z: 30.69,
    }
}

class Police extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.createServicePoint(factionData.servicePoint);
    }

    changeClothesMan(player) {
        // if(player.rank == 1)
        // {
            player.setProp(0, 46, 0);
            player.setClothes(8, 58, 0, 2);
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 55, 2, 2);
        // }
	}

	changeClothesWoman(player) {
        player.setProp(0, 46, 0);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 1);
	}
}
const police = new Police();