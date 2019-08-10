function addMisc()
{
	mp.attachmentMngr.register("mining", "prop_tool_jackham", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
	mp.attachmentMngr.register("drinking_1", "prop_ld_can_01", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
	mp.attachmentMngr.register("drinking_2", "prop_ecola_can", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
	mp.attachmentMngr.register("drinking_3", "prop_ld_flow_bottle", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
	mp.attachmentMngr.register("char_creator_1", "prop_beggers_sign_04", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
}

function addWeapons()
{
	let weapons = 
	[
		[ "Pistol", 1467525553, 0 ],
		[ "VintagePistol", -1124046276, 0 ],
		[ "APPistol", 905830540, 0 ],
		[ "CombatPistol", 403140669, 0 ],
		[ "Revolver", 914615883, 0 ],
		[ "SNSPistol", 339962010, 0 ],
		[ "HeavyPistol", 1927398017, 0 ],
		[ "Pistol50", -178484015, 0 ],

		[ "CombatPDW", -1393014804, 1 ],
		[ "MicroSMG", -1056713654, 1 ],
		[ "SMG", -500057996, 1 ],
		[ "MiniSMG", -972823051, 1 ],
		[ "MachinePistol", -331545829, 1 ],
		[ "AssaultSMG", -473574177, 1 ],

		[ "PumpShotgun", 689760839, 2 ],
		[ "HeavyShotgun", -1209868881, 2 ],
		[ "AssaultShotgun", 1255410010, 2 ],
		[ "BullpupShotgun", -1598212834, 2 ],

		[ "CarbineRifle", 1026431720, 3 ],
		[ "AssaultRifle", 273925117, 3 ],
		[ "SpecialCarbine", -1745643757, 3 ],
		[ "MarksmanRifle", -1711248638, 3 ]	
	];
	
	let offset = new mp.Vector3(0.0, 0.0, 0.0);
	let rotation = new mp.Vector3(0.0, 0.0, 0.0);
	
	for(let weap of weapons)
	{
		let bone = 0;
		
		switch (weap[2])
		{
			case 0:
				bone = 51826; //"SKEL_R_Thigh";
				offset = new mp.Vector3(0.02, 0.06, 0.1);
				rotation = new mp.Vector3(-100.0, 0.0, 0.0);
				break;

			case 1:
				bone = 58271; //"SKEL_L_Thigh";
				offset = new mp.Vector3(0.08, 0.03, -0.1);
				rotation = new mp.Vector3(-80.77, 0.0, 0.0);
				break;

			case 2:
				bone = 24818; //"SKEL_Spine3";
				offset = new mp.Vector3(-0.1, -0.15, 0.11);
				rotation = new mp.Vector3(-180.0, 0.0, 0.0);
				break;

			case 3:
				bone = 24818; //"SKEL_Spine3";
				offset = new mp.Vector3(-0.1, -0.15, -0.13);
				rotation = new mp.Vector3(0.0, 0.0, 3.5);
				break;
		}
		
		mp.attachmentMngr.register(weap[0], weap[1], bone, offset, rotation);
	}
}

