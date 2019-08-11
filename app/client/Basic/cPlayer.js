const misc = require('../cMisc');

mp.events.add({
	"cPlayer-getWeaponAmmo" : () => {
        let ammo = mp.players.local.getWeaponAmmo();

        mp.gui.chat.push("ammo : " + ammo);
    },
});