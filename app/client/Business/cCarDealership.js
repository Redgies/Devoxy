const misc = require('../cMisc');

mp.events.add({
	"cCheapCarDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/CheapCarDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cCommercialCarDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/CommercialCarDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cMotoDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/MotoDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cAvionDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/AvionDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cBateauDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/BateauDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cTruckDealership-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/TruckDealership/ccd.html", lang);
		misc.injectCef(inject);
	},

	"cAmmunations-OpenBuyerMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Business/Ammunations/ammunation.html", lang);
		misc.injectCef(inject);
	}
});