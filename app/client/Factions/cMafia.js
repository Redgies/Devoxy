const misc = require('../cMisc');

mp.events.add({
	"cMafia-Open" : () => {
		misc.prepareToCef(0, true, true, true);
		misc.openCef("package://RP/Browsers/Mafia/creation.html");
	},
	"cLSPD-Open" : (inject) => {
		misc.prepareToCef(0, true, true, true);
		misc.openCef("package://RP/Browsers/LSPD/creation.html");
		misc.injectCef(inject);
    },
});