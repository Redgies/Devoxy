
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{

	/* "cHospital-ShowDoctorMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Hospital/interactiveMenu.html", lang);
		misc.injectCef(inject);
	}, */
	"cCuff": () => {        
        player.setEnableHandcuffs(true);
		player.cuffed = true;
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(2, 22, true);
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
    },

});
