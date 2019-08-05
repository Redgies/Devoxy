const misc = require('../cMisc');

mp.events.add({
	"cPhone-Open" : (inject) => {
		misc.prepareToCef(1);
		misc.openCef("package://RP/Browsers/Phone/phone.html");
		misc.injectCef(inject);
	},
	
});