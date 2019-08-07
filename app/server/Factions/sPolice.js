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
    ]
}

class Police extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.ranks);
    }
}
const police = new Police();