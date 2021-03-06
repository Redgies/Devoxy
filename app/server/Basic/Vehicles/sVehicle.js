
const misc = require('../../sMisc');
const i18n = require('../../sI18n');


class Vehicle {
	constructor (d) {
		const pos = JSON.parse(d.coord);
		const vehicle = mp.vehicles.new(d.model, new mp.Vector3(pos.x, pos.y, pos.z),
		{
			heading: pos.rot,
			dimension: pos.dim,
			locked: true,
			engine: false,
		});
		vehicle.guid = d.id;
		vehicle.title = d.title;
		vehicle.numberPlate = d.numberPlate;
		vehicle.fuel = d.fuel;
		vehicle.fuelTank = d.fuelTank;
		vehicle.fuelRate = d.fuelRate;
		vehicle.price = d.price;
		vehicle.ownerId = d.ownerId;
		vehicle.whoCanOpen = JSON.parse(d.whoCanOpen);
		vehicle.factionId = d.factionId;
		vehicle.windowsOpened = [false, false, false, false];
		vehicle.ownerName = d.firstName + ' ' + d.lastName;

		const primaryColor = JSON.parse(d.primaryColor);
		const secondaryColor = JSON.parse(d.secondaryColor);


		vehicle.primaryColor = primaryColor;
		vehicle.secondaryColor = secondaryColor;
		vehicle.tunning = JSON.parse(d.tunning);

		if(vehicle.tunning.length >= 1) {
			for(let i = 0; i < vehicle.tunning.length; i++)
			{
				vehicle.setMod(parseInt(vehicle.tunning[i].mod), parseInt(vehicle.tunning[i].value));
			}
		}
		
		vehicle.setColorRGB(primaryColor[0], primaryColor[1], primaryColor[2], secondaryColor[0], secondaryColor[1], secondaryColor[2]);

		vehicle.canOpen = function(player) {
			if(player.dimension !== this.dimension) return false;
			if(player.aduty) return true;
			if(player.faction && player.faction === this.factionId) return true;
			for (const p of this.whoCanOpen) {
				if (p !== player.guid) continue;
				return true;
			}
			return false;
		}

		vehicle.toggleDoorsLock = function(player) {
			if (vehicle.locked) {
				this.unlock();

				player.notifyWithPicture("Véhicule", "", `${this.title} : ~g~ouvert`, "CHAR_LS_CUSTOMS");
//				player.outputChatBox(`${this.title} !{0, 200, 0}${i18n.get('sVehicle', 'unlocked', player.lang)}`);
				// player.notifyWithPicture("Info", "", `${this.title} ~g~${i18n.get('sVehicle', 'unlocked', player.lang)}.`, "CHAR_PROPERTY_ARMS_TRAFFICKING");
			}
			else {
				this.lock();

				player.notifyWithPicture("Véhicule", "", `${this.title} : ~r~fermé`, "CHAR_LS_CUSTOMS");
//				player.outputChatBox(`${this.title} !{200, 0, 0}${i18n.get('sVehicle', 'locked', player.lang)}`);
				// player.notifyWithPicture("Info", "", `${this.title} ~r~${i18n.get('sVehicle', 'locked', player.lang)}`, "CHAR_PROPERTY_ARMS_TRAFFICKING");
			}
			vehicle.locked = !vehicle.locked;
		}
		
		vehicle.lock = function() {
			// if (this.getOccupants().length === 0) this.blinkLights(); 
		}

		vehicle.setColor = function() {
			vehicle.primaryColor
		}

		vehicle.unlock = function() {
			if (this.getOccupants().length === 0) {
				// this.blinkLights();
				setTimeout(() => {
					// this.blinkLights();
				}, 600);
			}
		}

		// vehicle.blinkLights = function() { 
		// 	const engineStatus = this.engine;
		// 	if (!engineStatus) this.engine = true;
		
		// 	const players = mp.players.toArray();
		// 	for (const player of players) {
		// 		player.call("cVehicle-setLights", [this, 2]);
		// 		setTimeout(() => {
		// 			player.call("cVehicle-setLights", [this, 0]);
		// 		}, 300);
		// 	}

		// 	if (!engineStatus) {
		// 		setTimeout(() => {
		// 			this.engine = engineStatus;
		// 		}, 300);
		// 	}
		// }

		vehicle.canRollWindow = function(player, window) {
			if (player.isDriver() || player.seat + 1 === window) return true;
			return false;
		}

		vehicle.toggleWindow = function(player, window) {
			if (!this.canRollWindow(player, window)) return;
			const windowOpened = this.windowsOpened[window];
			let action;
			if (windowOpened) action = "cVehicle-rollUpWindow";
			else action = "cVehicle-rollDownWindow";
			mp.players.forEach((p, id) => {
				p.call(action, [this, window]);
			});
			vehicle.windowsOpened[window] = !windowOpened;
		}

		vehicle.fillUp = async function(litres) {
			vehicle.fuel += litres;
			if (vehicle.fuel > vehicle.fuelTank) vehicle.fuel = vehicle.fuelTank;
		}

		vehicle.sellToGovernment = async function(player) {
			if (vehicle.ownerId !== player.guid) return;
			player.addBankMoney(this.price / 2, `${i18n.get('sVehicle', 'sellVehicle', player.lang)}`);
			await misc.query(`DELETE FROM vehicles WHERE id = ${vehicle.guid} AND ownerId = '${player.guid}' LIMIT 1`);
			this.destroy();
		}

 		return vehicle;
	}

}
module.exports = Vehicle;

const propertyName = "__tyreSmokeColor";

/**
 * Sets the tire smoke color of a vehicle.
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 */
mp.Vehicle.prototype.setTyreSmokeColor = function(red, green, blue) {
    if (!Number.isInteger(red) || !Number.isInteger(green) || !Number.isInteger(blue)) {
        throw new TypeError("Non number argument(s) passed to setTyreSmokeColor.");
    }

    if ((red < 0 || red > 255) || (green < 0 || green > 255) || (blue < 0 || blue > 255)) {
        throw new RangeError("Invalid red/green/blue value(s) passed to setTyreSmokeColor.");
    }

    this.setVariable(propertyName, `${red}|${green}|${blue}`);
};

/**
 * Gets the tire smoke color of a vehicle.
 * @return {Object} Tire smoke color, will be null if the vehicle doesn't have one set.
 */
mp.Vehicle.prototype.getTyreSmokeColor = function() {
    const data = this.getVariable(propertyName);

    if (data) {
        const [red, green, blue] = data.split("|");

        return {
            r: Number(red),
            g: Number(green),
            b: Number(blue)
        };
    } else {
        return null;
    }
};

/**
 * Resets the tire smoke color of a vehicle.
 */
mp.Vehicle.prototype.resetTyreSmokeColor = function() {
    if (this.getVariable(propertyName)) {
        this.setVariable(propertyName, null);
    }
};