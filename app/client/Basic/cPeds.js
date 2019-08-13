const misc = require('../cMisc');

mp.events.add("createPed", () => {
	let ped1 = mp.peds.new(mp.game.joaat('a_m_y_business_02'), new mp.Vector3(-1039.167, -2730.757, 20.214), 270.0, mp.players.local.dimension);
	let ped2 = mp.peds.new(mp.game.joaat('s_m_y_cop_01'), new mp.Vector3(435.043, -983.981, 30.69), 264.8, mp.players.local.dimension);
	//Ammunation droite du comico zone indus//
	let ped3 = mp.peds.new(mp.game.joaat('s_m_y_ammucity_01'), new mp.Vector3(843.553, -1035.356, 28.195), 3.63, mp.players.local.dimension);
	//Ammunation en bas zone indu// 
	let ped4 = mp.peds.new(mp.game.joaat('s_m_y_ammucity_01'), new mp.Vector3(811.581, -2159.049, 29.619), 356.24, mp.players.local.dimension);
	//Ammunation haut de la ville//// 
	let ped5 = mp.peds.new(mp.game.joaat('s_m_y_ammucity_01'), new mp.Vector3(254.156, -49.52, 69.941), 64.89, mp.players.local.dimension);
	//Coiffeur leave// 
	let ped6 = mp.peds.new(mp.game.joaat('s_m_m_hairdress_01'), new mp.Vector3(-34.03, -152.27, 57.087), 338.15, mp.players.local.dimension);
	//clothes shop luxe// 
	let ped7 = mp.peds.new(mp.game.joaat('u_f_y_princess'), new mp.Vector3(-165.111, -303.505, 39.733), 253.68, mp.players.local.dimension);
	//coiffeur luxe// 
	let ped8 = mp.peds.new(mp.game.joaat('s_m_m_hairdress_01'), new mp.Vector3(-814.089, -182.502, 37.569), 127.75, mp.players.local.dimension);
});