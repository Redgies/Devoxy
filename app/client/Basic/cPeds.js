const misc = require('../cMisc');

mp.events.add({
	"cPeds-Init" : () => {
        let Ped = mp.peds.new(mp.game.joaat('MP_F_Freemode_01'), new mp.Vector3(-1039.167, -2730.757, 20.214), 270.0, mp.players.local.dimension);
	},
});