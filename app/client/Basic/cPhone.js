const misc = require('../cMisc');

mp.events.add({
	"cPhone-Open" : (inject) => {
		misc.prepareToCef(0, false, true, true);
		misc.openCef("package://RP/Browsers/Phone/phone.html");
		misc.injectCef(inject);
	},
	"cPhone-Update" : (inject) => {
		misc.injectCef(inject);
	},
	"cPhone-soundSMS" : () => {
		misc.prepareToCef(0, false, true, true);
		misc.openCef("package://RP/Browsers/Phone/sounds.html");
		misc.injectCef.execute(`playSoundSMS()`);
	}
});