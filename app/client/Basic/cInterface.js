const misc = require('../cMisc');

mp.events.add({
	"cInterface-Open" : (inject) => {
		misc.prepareToCef(0, true, true, true);
		misc.openCef("package://RP/Browsers/Interface/interface.html");
		misc.injectCef(inject);
    },
});