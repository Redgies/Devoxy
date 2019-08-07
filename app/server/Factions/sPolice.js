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
}
const police = new Police();