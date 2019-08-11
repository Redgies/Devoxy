const misc = require('../cMisc');

let player = mp.players.local;

mp.events.add({
	"cPlayer-getWeaponAmmo" : () => {
        var weapon_hash = player.weapon;

        let ammoClip = player.getAmmoInClip(weapon_hash);
        // let ammo = player.getWeaponAmmo();

        mp.gui.chat.push("ammo : " + ammo + " - " + ammoClip);
    },
});