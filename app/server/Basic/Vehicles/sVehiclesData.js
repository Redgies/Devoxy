class VehiclesDataSingleton {
	constructor() {
		this.vehicles = [
			{   model: "panto",         title: "Panto",          fuelTank: 40,   fuelRate: 100,  price: 22000,   },
            {   model: "peyote",        title: "Peyote",              fuelTank: 50,   fuelRate: 100,  price: 27000,   },
            {   model: "dloader",       title: "Duneloader",        fuelTank: 75,   fuelRate: 120,  price: 40000,   },
            {   model: "dilettante",    title: "Dilettante",          fuelTank: 45,   fuelRate: 150,  price: 35000,   },
            {   model: "issi2",         title: "Issi",                fuelTank: 50,   fuelRate: 110,  price: 60000,   },
            {   model: "moonbeam",      title: "Moonbeam",         fuelTank: 70,   fuelRate: 130,  price: 65000,   },
            {   model: "rebel",         title: "Rebel",               fuelTank: 65,   fuelRate: 180,  price: 80000,   },
            {   model: "blista",        title: "Blista",              fuelTank: 45,   fuelRate: 110,  price: 80000,   },
            {   model: "prairie",       title: "Prairie",          fuelTank: 55,   fuelRate: 130,  price: 87500,   },
            {   model: "bifta",         title: "Bifta",                  fuelTank: 40,   fuelRate: 160,  price: 125000,   },
            {   model: "emperor",       title: "Emperor",            fuelTank: 60,   fuelRate: 170,  price: 120000,   },
            {   model: "pigalle",       title: "Pigalle",         fuelTank: 55,   fuelRate: 180,  price: 150000,   },
            {   model: "chino2",        title: "Chino Custom",        fuelTank: 65,   fuelRate: 200,  price: 160000,   },
            {   model: "serrano",       title: "Serrano",        fuelTank: 60,   fuelRate: 150,  price: 210000,  },
			{   model: "rancherxl",     title: "RancherXL",        fuelTank: 80,   fuelRate: 230,  price: 210000,  },
			{   model: "surge",     	title: "Tesla S",        fuelTank: 40,   fuelRate: 40,  price: 250000,  },
            {   model: "buccaneer",     title: "Buccaneer",          fuelTank: 75,   fuelRate: 180,  price: 260000,  },
            {   model: "glendale",      title: "Glendale",       fuelTank: 60,   fuelRate: 160,  price: 270000,  },
            {   model: "radi",          title: "Radius",              fuelTank: 50,   fuelRate: 180,  price: 290000,  },
            {   model: "rapidgt3",      title: "Rapid GT",       fuelTank: 50,   fuelRate: 200,  price: 290000,  },
            {   model: "xls",           title: "XLS",            fuelTank: 70,   fuelRate: 230,  price: 400000,  },
            {   model: "dominator",     title: "Dominator",           fuelTank: 70,   fuelRate: 230,  price: 500000,  },
            {   model: "tulip",         title: "Tulip",            fuelTank: 50,   fuelRate: 220,  price: 270000,  },
            {   model: "patriot2",      title: "Patriot 2",         fuelTank: 80,   fuelRate: 230,  price: 270000,  },
            {   model: "dominator3",    title: "Dominator GTX",       fuelTank: 60,   fuelRate: 230,  price: 270000,  },
            {   model: "cog55",         title: "Cognoscenti",          fuelTank: 55,   fuelRate: 200,  price: 600000,  },
            {   model: "oracle",        title: "Oracle",          fuelTank: 65,   fuelRate: 250,  price: 600000,  },
            {   model: "fq2",           title: "FQ2",                fuelTank: 80,   fuelRate: 250,  price: 600000,  },
            {   model: "hermes",        title: "Hermes",             fuelTank: 60,   fuelRate: 240,  price: 850000,  },
            {   model: "sultanrs",      title: "Sultan RS",                 fuelTank: 55,   fuelRate: 210,  price: 870000,  },
            {   model: "buffalo2",      title: "Buffalo 2",         fuelTank: 65,   fuelRate: 270,  price: 900000,  },
            {   model: "carbonizzare",  title: "Carbonizzare",       fuelTank: 60,   fuelRate: 290,  price: 1200000,  },
            {   model: "coquette",      title: "Coquette",         fuelTank: 55,   fuelRate: 270,  price: 1250000,  },
            {   model: "jester",        title: "Jester",                    fuelTank: 62,   fuelRate: 300,  price: 1300000,  },
            {   model: "kuruma",        title: "Kuruma",              fuelTank: 60,   fuelRate: 300,  price: 1300000,  },
            {   model: "reaper",        title: "Reaper",            fuelTank: 55,   fuelRate: 300,  price: 1400000,  },
            {   model: "drafter",       title: "Drafter",                 fuelTank: 60,   fuelRate: 270,  price: 1430000,  },
            {   model: "toros",         title: "Toros",             fuelTank: 55,   fuelRate: 320,  price: 1450000,  },
            {   model: "fmj",           title: "FMJ",                 fuelTank: 60,   fuelRate: 300,  price: 1800000,  },
			{   model: "zentorno",      title: "Zentorno",          fuelTank: 55,   fuelRate: 300,  price: 2000000,  },
			{   model: "tezeract",      title: "Tesla T",          fuelTank: 80,   fuelRate: 50,  price: 650000,   },
			{   model: "raiden",        title: "Tesla R",          fuelTank: 80,   fuelRate: 50,  price: 650000,   },

			{   model: "brioso",         title: "Brioso",          fuelTank: 40,   fuelRate: 120,  price: 350000,   },
			{   model: "baller6",         title: "Baller blindé",          fuelTank: 80,   fuelRate: 150,  price: 350000,   },
			{   model: "hotknife",         title: "Hot Knife",          fuelTank: 60,   fuelRate: 150,  price: 575000,   },
			{   model: "t20",           title: "T20",       fuelTank: 60,   fuelRate: 290,  price: 1200000,  },
			{   model: "neo",           title: "Neo",                 fuelTank: 60,   fuelRate: 300,  price: 1750000,  },
			{   model: "infernus",           title: "Infernus",                 fuelTank: 60,   fuelRate: 300,  price: 1900000,  },
			{   model: "adder",           title: "Adder",                 fuelTank: 80,   fuelRate: 280,  price: 2200000,  },
			{   model: "emerus",           title: "Emerus",                 fuelTank: 80,   fuelRate: 280,  price: 2400000,  },

			{	model: "mule",			title: "Maibatsu Mule",				fuelTank: 160,	fuelRate: 20,	price: 35000,	},
			{	model: "mule2",			title: "Maibatsu Mule 2",			fuelTank: 200,	fuelRate: 25,	price: 50000,	},
			{	model: "mule3",			title: "Maibatsu Mule 3",			fuelTank: 200,	fuelRate: 28,	price: 75000,	},
			{	model: "mule4",			title: "Maibatsu Mule Custom",		fuelTank: 250,	fuelRate: 30,	price: 150000,	},
			
			{   model: "seashark",         title: "SeaShark",          fuelTank: 50,   fuelRate: 150,  price: 35000,   },
			{   model: "dinghy",         title: "Dinghy",          fuelTank: 50,   fuelRate: 150,  price: 125000,   },
			{   model: "speeder",         title: "Speeder",          fuelTank: 50,   fuelRate: 150,  price: 225000,   },
			{   model: "marquis",         title: "Marquis",          fuelTank: 50,   fuelRate: 150,  price: 350000,   },
			
			
			{	model: "dodo",		title: "Dodo", 			fuelTank: 60, 	fuelRate: 16, 	price: 20000,	},
			{	model: "cuban800", 	title: "Cuban", 		    fuelTank: 80, 	fuelRate: 25, 	price: 20000,	},
			{   model: "buzzard2",         title: "Buzzard 2",          fuelTank: 50,   fuelRate: 150,  price: 800000,   },
			{   model: "havok",         title: "Havok",          fuelTank: 50,   fuelRate: 150,  price: 850000,   },
			{   model: "swift",         title: "Swift",          fuelTank: 50,   fuelRate: 150,  price: 1200000,   },
			{   model: "cargobob2",         title: "Cargobob 2",          fuelTank: 50,   fuelRate: 150,  price: 1600000,   },

			{   model: "faggio",         title: "Faggio",          fuelTank: 35,   fuelRate: 70,  price: 3000,   },
			{   model: "bf400",         title: "BF400",          fuelTank: 45,   fuelRate: 100,  price: 25000,   },
			{   model: "enduro",         title: "Enduro",          fuelTank: 55,   fuelRate: 140,  price: 25750,   },
			{   model: "sanchez2",         title: "Sanchez",          fuelTank: 45,   fuelRate: 140,  price: 30000,   },
			{   model: "vader",         title: "Vader",          fuelTank: 45,   fuelRate: 135,  price: 37500,   },
			{   model: "hakuchou",         title: "Hakuchou",          fuelTank: 50,   fuelRate: 150,  price: 150000,   },
			{   model: "nightblade",         title: "Nightblade",          fuelTank: 50,   fuelRate: 180,  price: 140000,   },
			{   model: "double",         title: "Double T",          fuelTank: 50,   fuelRate: 120,  price: 55750,   },
			{   model: "nemesis",         title: "Nemesis",          fuelTank: 45,   fuelRate: 135,  price: 60000,   },
			{   model: "bati",      title: "Bati",              fuelTank: 45,   fuelRate: 11,   price: 120000,   },
		
		];
	}

	getPrice(model) {
		for (let i = 0; i < this.vehicles.length; i++) {
			if (model !== this.vehicles[i].model) continue;
			return this.vehicles[i].price;
		}
		return false;
	}

	getData(model) {
		for (let i = 0; i < this.vehicles.length; i++) {
			if (model !== this.vehicles[i].model) continue;
			return this.vehicles[i];
		}
		return false;
	}

}
const vehiclesDataSingleton = new VehiclesDataSingleton();
module.exports = vehiclesDataSingleton;