const misc = require('../cMisc');

mp.events.add("createPed", () => {
	mp.gui.chat.push("create ped");
	let ped = mp.peds.new(mp.game.joaat('s_m_y_ammucity_01'), new mp.Vector3(-1039.167, -2730.757, 20.214), 270.0, mp.players.local.dimension);
});