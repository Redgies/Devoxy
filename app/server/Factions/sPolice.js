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
}

class Police extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.ranks, factionData.maxRank);
    }
}
const police = new Police();