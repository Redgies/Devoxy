const misc = require('../cMisc');

mp.events.add({
	"cVip-Open" : () => {
		misc.prepareToCef(0);
		misc.openCef("package://RP/Browsers/Vip/index.html");
		// misc.injectCef(inject);
	},
});