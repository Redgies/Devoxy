const misc = require('../cMisc');

mp.events.add("createPed", () => {
	let ped1 = mp.peds.new(mp.game.joaat('a_m_y_business_02'), new mp.Vector3(-1039.167, -2730.757, 20.214), 270.0, mp.players.local.dimension);
	let ped2 = mp.peds.new(mp.game.joaat('s_m_y_cop_01'), new mp.Vector3(435.043, -983.981, 30.69), 264.8, mp.players.local.dimension);
	let ped3 = mp.peds.new(mp.game.joaat('s_m_y_ammucity_01'), new mp.Vector3(21.702, -1105.124, 29.797), 162.08, mp.players.local.dimension); // AMMUNATION cv
	let ped4 = mp.peds.new(mp.game.joaat('ig_abigail'), new mp.Vector3(-51.972, -1110.64, 26.422), 341.83, mp.players.local.dimension); // CONCESS cv
});