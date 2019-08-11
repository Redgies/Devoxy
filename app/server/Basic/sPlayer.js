const misc = require('../sMisc');
const i18n = require('../sI18n');
const moneySingleton = require('./Money/sMoney');
const characterSingleton = require('../Character/sCharacterCreator');
const clothesSingleton = require('../Character/sClothes');
const headOverlaySingleton = require('../Character/sHeadOverlay');
const vehiclesSingleton = require('../Basic/Vehicles/sVehicleSingletone');
const faction = require('../Factions/sFaction');
// const hospital = require('../Factions/Hospital/sHospital');
// const prison = require('../Factions/Police/Prison/sPrison');

class PlayerSingleton {

    async createNewUser(player, email, firstName, lastName, pass) {
        const firstSpawn = { 
            x: -164, 
            y: 6426, 
            z: 32, 
            rot: 48, 
            dim: 0, 
        }
        const weapons = [];
        await misc.query(`INSERT INTO users 
        (email, firstName, lastName, password, ip, regdate, position, socialclub, weapons) VALUES 
        ('${email}', '${firstName}', '${lastName}', '${pass}', '${player.ip}', '${new Date().toLocaleString()}', '${JSON.stringify(firstSpawn)}', '${player.socialClub}', '${JSON.stringify(weapons)}')`);

        misc.log.debug(`New Account: ${email} | ${firstName} ${lastName}`);
    }

    async loadAccount(player, id) {
        const d = await misc.query(`SELECT * FROM users WHERE id = '${id}' LIMIT 1`);
        player.loggedIn = true;
        player.aduty = false;
        player.guid = d[0].id;
        player.email = d[0].email;
        player.firstName = d[0].firstName;
        player.lastName = d[0].lastName;
        player.adminLvl = d[0].adminlvl;
        player.faction = d[0].faction;
        player.rank = d[0].rank;
        player.phone = d[0].phone;
        player.lang = d[0].lang;
        player.fly = false;
        player.loyality = d[0].loyality;
        player.vip = d[0].vip;
        player.updateName();
        player.tp(JSON.parse(d[0].position));
        player.health = d[0].health;
        player.pWeapons = JSON.parse(d[0].weapons);

        player.call("cCloseCefAndDestroyCam");

        const q1 = moneySingleton.loadUser(player);
        const q2 = characterSingleton.loadPlayerBody(player);
        const q3 = clothesSingleton.loadPlayerClothes(player);
        const q4 = headOverlaySingleton.loadUser(player);
        const q5 = vehiclesSingleton.loadPlayerVehicles(player.guid);
        const q6 = faction.loadUser(player);
        // const q7 = hospital.loaddUser(player);
        // const q8 = prison.loadUser(player);
        await Promise.all([q1, q2, q3, q4, q5, q6]);

        for(let i = 0; i < player.pWeapons.length; i++)
        {
            console.log("hash : " + player.pWeapons[i].hash + " ammo : " + player.pWeapons[i].ammo);
            player.giveWeapon(1737195953, parseInt(player.pWeapons[i].ammo));
        }

        misc.log.debug(`${player.name} logged in`);
    }

    saveAccount(player) {
        player.saveBasicData();
        vehiclesSingleton.savePlayerVehicles(player.guid);
        // prison.savePlayerAccount(player);
//        misc.log.debug(`${player.name} disconnected`);
//        player.loggedIn = false;
    }

    loadPlayerTemplate(player) {
        player.loggedIn = false;
        player.lang = 'eng';
        player.guid = false;
        player.email = false;
        player.firstName = false;
        player.lastName = false;
        player.loyality = 0;
        player.adminLvl = 0;
        player.vip = 0;
        player.faction = 0;
        player.rank = 0;
        player.cuffed = 0;
        player.fly = false;
        player.phone = 0;
        player.canOpen = {};
        player.canEnter = {};
        player.job = {};


        player.setWeapon = function(hash, ammo) {
            player.giveWeapon(hash, ammo);


            console.log("giveWeapon : " + hash);

            let hasWeapon = false;

            // if(player.pWeapons.length <= 0)
            // {
            //     const newWep = {
            //         hash: hash,
            //         ammo: ammo
            //     }

            //     player.pWeapons.push(newWep);
            //     return 1;
            // }

            for(let i = 0; i < player.pWeapons.length; i++)
            {
                if(player.pWeapons[i].hash === hash)
                {
                    player.pWeapons[i].ammo += ammo;
                    let hasWeapon = true;
                    continue;
                }
            }

            if(!hasWeapon)
            {
                const newWep = {
                    hash: hash,
                    ammo: ammo
                }

                player.pWeapons.push(newWep);
                return 1;
            }
        }


        player.updateName = function() {
            this.name = `${this.firstName} ${this.lastName}`;
        }
        player.tp = function(d) {
            this.position = new mp.Vector3(d.x, d.y, d.z);
            this.heading = d.rot;
            this.dimension = 0;
            if (d.dim) this.dimension = d.dim;
        }

        player.setCuff = function(cuffed) {
            player.cuffed = cuffed;

            if(player.cuffed)
            {
                player.setClothes(7, 41, 0, 2);
                player.call("cCuff");
                player.playAnimation('mp_arresting', 'idle', 1, 49);
            }
            else 
            {
                player.setClothes(7, 0, 0, 2);
                player.call("cUnCuff");
                player.stopAnimation();
            }
        }

        player.tpWithVehicle = function(d) {
            if (!this.isDriver() || !this.vehicle) return;
            this.vehicle.position = new mp.Vector3(d);
            this.heading = d.rot;
            this.vehicle.dimension = d.dim;
        }

        player.getCurrentPos = function(changeHeight = 0) {
            const obj = {
                x: misc.roundNum(this.position.x, 1),
                y: misc.roundNum(this.position.y, 1),
                z: misc.roundNum(this.position.z + changeHeight, 1),
                rot: misc.roundNum(this.heading, 1),
                dim: this.dimension,
            }
            return obj;
        }

        player.getLoyality = function(value) {
            return this.loyality;
        }

        player.addLoyality = function(value) {
            value = misc.roundNum(value);
			if (value === 0) return;
            this.loyality += value;
            this.showLoyalityNotification(value);
        }

        player.removeLoyality = function(value) {
            value = misc.roundNum(value);
            this.loyality -= value;
            if (this.loyality < 0) this.loyality = 0;
            this.showLoyalityNotification(-value);
        }

        player.showLoyalityNotification = function(value) {
            let plus = "";
            if (value > 0) plus = "+";
            this.notify(`${i18n.get('sLoyality', 'loyality', this.lang)} ~b~${plus}${value}`);
        }

        player.saveBasicData = function() {
            const pos = this.getCurrentPos(0.1);
            misc.query(`UPDATE users SET ip = '${this.ip}', logdate = '${new Date().toLocaleString()}', position = '${JSON.stringify(pos)}', health = '${this.health}', loyality = '${this.loyality}', faction = '${this.faction}', rank = '${this.rank}', weapons = '${JSON.stringify(this.pWeapons)}' WHERE id = '${this.guid}'`);
        }

        player.isDriver = function() {
            if (!this.vehicle || this.seat !== -1) return false;
            return true;
        }
        
    }

}
const playerSingleton = new PlayerSingleton();
module.exports = playerSingleton;


mp.events.addCommand({
    'save' : (player) => {
//      if (!player.loggedIn || player.adminlvl < 1) return;
        if (!player.loggedIn) return;
        playerSingleton.saveAccount(player);
        player.outputChatBox(`!{#00b894}[INFOS] Votre compte a été sauvegardé.`);
    },


    'pos' : (player) => { 
        if (player.adminLvl < 1) return;
        const pos = player.position;
        let rot;
        if (player.vehicle) rot = player.vehicle.rotation.z
        else rot = player.heading;
        const str = `x: ${misc.roundNum(pos.x, 3)}, y: ${misc.roundNum(pos.y, 3)}, z: ${misc.roundNum(pos.z, 3)}, rot: ${misc.roundNum(rot, 2)}`;
        player.outputChatBox(str);
        misc.log.debug(str);
    },
    
});

mp.events.add("fpsync.update", (player, camPitch, camHeading) => {
    mp.players.call(player.streamedPlayers, "fpsync.update", [player.id, camPitch, camHeading]);

});

mp.events.add("pointingStop", (player) => {
    player.stopAnimation();
});

mp.events.add({
    "playerDeath" : (player) => {
        player.call("cMisc-CallServerEvenWithTimeout", ["sHospital-SpawnAfterDeath", 10000]);
    },
    "sHospital-SpawnAfterDeath" : (player) => {
        if (!player.loggedIn) return;

        player.spawn(new mp.Vector3(player.position));
        player.health = 1;
        player.call("cHospital-DisableHealthRegeneration");
        player.healingSpeed = 0;
        const posToDrop = { x: -498.184, y: -335.741, z: 34.502 };
        const dist = player.dist(posToDrop);
        const pay = misc.roundNum(dist / 20);
        player.newFine(pay, `${i18n.get('sHospital', 'transferTo', player.lang)}`);

        const tp = { x: 275.446, y: -1361.11, z: 24.5378, rot: 46.77, dim: 0 };
        player.tp(tp);
        misc.log.debug(`${player.name} transfered to Hospital. Fine: $${pay}`);

        player.setCuff(false);
    }
});

// Save Player bei allem möglichem

// Save by enter Vehicle
function playerStartEnterVehicleHandler(player) {
 
    if (!player.loggedIn) return;
    playerSingleton.saveAccount(player);
    // player.notifyWithPicture("System", "Account Saving", "~g~Your Account was saved.", "CHAR_BLOCKED");
//    player.outputChatBox(`${i18n.get('sLogin', 'saveGame', player.lang)}`);
}
 
 mp.events.add("playerStartEnterVehicle", playerStartEnterVehicleHandler);

// Save by exit Vehicle
function playerExitVehicleHandler(player) {
    if (!player.loggedIn) return;
    playerSingleton.saveAccount(player);
    // player.notifyWithPicture("System", "Account Saving", "~g~Your Account was saved.", "CHAR_BLOCKED");
//    player.outputChatBox(`${i18n.get('sLogin', 'saveGame', player.lang)}`);
}

    mp.events.add("playerExitVehicle", playerExitVehicleHandler);

