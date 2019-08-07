const misc = require('../sMisc');
const faction = require('../sFaction');

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
        super(id, name, ranks);
    }
}
const Police = new Police();