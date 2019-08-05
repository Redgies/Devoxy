const misc = require('../cMisc');

mp.events.add({
	"cTab-Open" : (inject) => {
		misc.prepareToCef(1);
		misc.openCef("package://RP/Browsers/Tab/tab.html");
		misc.injectCef(inject);
	},
	
});