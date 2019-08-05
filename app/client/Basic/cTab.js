const misc = require('../cMisc');

mp.events.add({
	"cTab-Open" : (lang, inject) => {
		misc.prepareToCef(1);
		misc.openCef("package://RP/Browsers/Tab/tab.html", lang);
		misc.injectCef(inject);
	},
	
});