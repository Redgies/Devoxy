let adminLvl = mp.players.local.getVariable("adminLvl");

if(adminLvl >= 1)
  mp.nametags.enabled = true;
else 
  mp.nametags.enabled = false;