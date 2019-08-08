
const misc= require('../sMisc');

const garagesList = [];

class Garage {
	constructor(garageData) {
		this.garage = garageData;

		this.createGarageElevatorShapes(this.garage);
		this.createEvents();

		garagesList.push(this);
	}

	createEvents()
	{
		mp.events.add({
			"playerEnterColshape" : (player, shape) => {
                if(!player.loggedIn) return;
    
                if(shape === this.eTopShape)
                {
                    player.canUseElevator = true;
                    player.notify("Appuyez ~b~E ~w~pour descendre dans le garage.");
				}

				if(shape === this.eUndergroundShape1 || shape === this.eUndergroundShape2 || shape === this.eUndergroundShape3 || shape === this.eUndergroundShape4 || shape === this.eUndergroundShape5)
				{
					player.canUseElevator = true;
					player.notify("Appuyez ~b~E ~w~pour sortir du garage.");
				}

				if(shape === this.eGarageTopEnter)
				{
					if(!player.isDriver()) return;

					player.canUseElevator = true;
					player.notify("Appuyez ~b~E ~w~pour descendre votre véhicule au garage.");
				}

				if(shape === this.eGarageUndergroundExit1 || shape === this.eGarageUndergroundExit2 || shape === this.eGarageUndergroundExit3 || shape === this.eGarageUndergroundExit4 || shape === this.eGarageUndergroundExit5)
				{
					if(!player.isDriver()) return;

					player.canUseElevator = true;
					player.notify("Appuyez ~b~E ~w~pour remonter votre véhicule.");
				}
			},
			"playerExitColshape" : (player, shape) => {
                if(!player.loggedIn) return;
                
                if(shape === this.eTopShape || shape === this.eUndergroundShape)
                    player.canUseElevator = false;
            },
			"sKeys-E" : (player) => {
				if(!player.loggedIn) return;

				if(player.canUseElevator)
					this.openElevator(player, player.dimension);
			},
		});
	}

	openElevator(player, dim)
	{
		let execute = `app.id = ${this.garage.id};`;
		execute += `app.dim = '${dim}';`;
		execute += `app.title = '${this.garage.title}';`;
		execute += `app.css = 'LSPoliceDepartmentGarage.css';`;
		player.call("cGarage-ShowVisitorsGarageMenu", [execute]);
	}

	enterGarage(player, floor)
	{
		const d = this.getElevatorEnterPos(floor);

		if(player.isDriver())
			player.tpWithVehicle(d);
		else 	
			player.tp(d);
	}

	getElevatorEnterPos(floor) {
		let pos = {
			x: 0,
			y: 0,
			z: 0,
			rot: 0,
			dim: 0,
		};

		if(player.isDriver())
		{
			if(floor === 0)
			{
				pos = this.garage.garage.topExit;
				pos.dim = 0;
			}
			else 
			{
				pos = this.garage.garage.undergroundEnter;
				pos.dim = this.garage.startDim + Math.abs(floor) - 1;
			}
			return pos;
		}

		if(floor === 0)
		{
			pos = this.garage.elevator.top;
			pos.dim = 0;
		}
		else 
		{
			pos = this.garage.elevator.underground;
			pos.dim = this.garage.startDim + Math.abs(floor) - 1;
		}
		return pos;
	}

	createGarageElevatorShapes(d)
	{
		let elevator = d.elevator;
		let garage = d.garage;

		this.eTopShape = mp.colshapes.newSphere(elevator.top.x, elevator.top.y, elevator.top.z, 1);

		this.eUndergroundShape1 = mp.colshapes.newSphere(elevator.underground.x, elevator.underground.y, elevator.underground.z, 1, this.garage.startDim);
		this.eUndergroundShape2 = mp.colshapes.newSphere(elevator.underground.x, elevator.underground.y, elevator.underground.z, 1, this.garage.startDim + 1);
		this.eUndergroundShape3 = mp.colshapes.newSphere(elevator.underground.x, elevator.underground.y, elevator.underground.z, 1, this.garagestartDim + 2);
		this.eUndergroundShape4 = mp.colshapes.newSphere(elevator.underground.x, elevator.underground.y, elevator.underground.z, 1, this.garagestartDim + 3);
		this.eUndergroundShape5 = mp.colshapes.newSphere(elevator.underground.x, elevator.underground.y, elevator.underground.z, 1, this.garagestartDim + 4);

		this.eGarageTopEnter = mp.colshapes.newSphere(garage.topEnter.x, garage.topEnter.y, garage.topEnter.z, 1);

		this.eGarageUndergroundExit1 = mp.colshapes.newSphere(garage.undergroundExit.x, garage.undergroundExit.y, garage.undergroundExit.z, this.garage.startDim);
		this.eGarageUndergroundExit2 = mp.colshapes.newSphere(garage.undergroundExit.x, garage.undergroundExit.y, garage.undergroundExit.z, this.garage.startDim + 1);
		this.eGarageUndergroundExit3 = mp.colshapes.newSphere(garage.undergroundExit.x, garage.undergroundExit.y, garage.undergroundExit.z, this.garage.startDim + 2);
		this.eGarageUndergroundExit4 = mp.colshapes.newSphere(garage.undergroundExit.x, garage.undergroundExit.y, garage.undergroundExit.z, this.garage.startDim + 3);
		this.eGarageUndergroundExit5 = mp.colshapes.newSphere(garage.undergroundExit.x, garage.undergroundExit.y, garage.undergroundExit.z, this.garage.startDim + 4);
	}

	// createGarage() {
	// 	this.mainEnter = super.createSingleEntrance(this.garage.basic);
	// 	this.createCheckShape(this.garage.topExit, this.garage.topExit.dim);
	// 	let liftShape = this.createEntranceShape(this.lift.topEntrance, this.lift.topEntrance.dim);
	// 	this.lift.shapesList.push(liftShape);

	// 	for (let i = this.garage.basic.startDim; i < this.garage.basic.startDim + this.garage.basic.floors; i++) {
	// 		const garageShape = this.createEntranceShape(this.garage.undergroundExit, i);
	// 		this.garage.shapesList.push(garageShape);
	// 		this.createCheckShape(this.garage.undergroundCheckCoord, i);

	// 		liftShape = this.createEntranceShape(this.lift.undergroundEntrance, i);

	// 		this.lift.shapesList.push(liftShape);
	// 	}
	// }

	// createEntranceShape(pos, dim) {
	// 	const mainEntrance = {
	// 		outPos: { x: pos.x, y: pos.y, z: pos.z, rot: pos.rot, dim },
	// 		outShapeR: pos.r,
	// 	}
	// 	const shape = super.createSingleEntrance(mainEntrance);
	// 	return shape.out;
	// }

	// createCheckShape(pos, dim) {
	// 	const shape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, pos.r);
	// 	shape.dimension = dim;
	// 	this.garage.checkShapesList.push(shape);
	// 	return shape;
	// }
	
	// enteredBuildingShape(player, entranceId) {
	// 	if (entranceId === this.mainEnter.out.entranceId) {
	// 		if (!player.isDriver()) return;
	// 		player.notify(`${i18n.get('basic', 'pressE', player.lang)} ${i18n.get('basic', 'toEnterGarage', player.lang)}`);
	// 	}
	// 	else if (this.isExitShapeValid(this.garage.shapesList, entranceId)) {
	// 		if (!player.isDriver()) return;
	// 		player.notify(`${i18n.get('basic', 'pressE', player.lang)} ${i18n.get('basic', 'toExitGarage', player.lang)}`);
	// 	}
	// 	else if (this.isExitShapeValid(this.lift.shapesList, entranceId)) {
	// 		player.notify(`${i18n.get('basic', 'pressE', player.lang)} ${i18n.get('basic', 'toCallLift', player.lang)}`);
	// 	}
	// }

	// isExitShapeValid(list, id) {
	// 	for (let i = 0; i < list.length; i++) {
	// 		if (list[i].entranceId === id) return true;
	// 	}
	// 	return false;
	// }

	// isCheckShapeClear(player, shape) {
	// 	const vehicles = mp.vehicles.toArray();
	// 	for (const vehicle of vehicles) {
	// 		if (shape.isPointWithin(vehicle.position) && shape.dimension === vehicle.dimension) {
	// 			player.notify(`~r~${i18n.get('basic', 'someVehicleIsBlocking', player.lang)}!`);
	// 			return false;
	// 		}
	// 	}
	// 	const players = mp.players.toArray();
	// 	for (const p of players) {
	// 		if (shape.isPointWithin(p.position)  && shape.dimension === p.dimension) {
	// 			player.notify(`~r~${i18n.get('basic', 'somePlayerIsBlocking', player.lang)}!`);
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	// getGarageEnterPos(floor) {
	// 	if (!misc.isValueNumber(floor)) return false;
	// 	const pos = this.garage.undergroundCheckCoord;
	// 	pos.dim = this.garage.basic.startDim + Math.abs(floor) - 1;
	// 	pos.checkShape = this.garage.checkShapesList[Math.abs(floor)];
	// 	return pos;
	// }

	// getLiftEnterPos(floor) {
	// 	if (!misc.isValueNumber(floor)) return;
	// 	let pos;
	// 	if (floor === 0) {
	// 		pos = this.lift.topEntrance;
	// 		pos.dim = 0;
	// 	}
	// 	else {
	// 		pos = this.lift.undergroundEntrance;
	// 		pos.dim = this.garage.basic.startDim + Math.abs(floor) - 1;
	// 	}
	// 	return pos;
	// }

	// tryToEnter(player, entranceId) {
	// 	if (entranceId === this.mainEnter.out.entranceId) {
	// 		return this.showGarageMenu(player);
	// 	}
	// 	else if (this.isExitShapeValid(this.garage.shapesList, entranceId)) { // Exit
	// 		if (!this.isCheckShapeClear(player, this.garage.checkShapesList[0])) return;
	// 		player.tpWithVehicle(this.garage.topExit);
	// 	}
	// 	else if (this.isExitShapeValid(this.lift.shapesList, entranceId)) {
	// 		return this.showLiftMenu(player);
	// 	}
	// }

	// enterGarage(player, floor) {
	// 	const d = this.getGarageEnterPos(floor);
	// 	if (!this.isCheckShapeClear(player, d.checkShape)) return;
	// 	player.tpWithVehicle(d);
	// }

	// enterLift(player, floor) {
	// 	const d = this.getLiftEnterPos(floor);
	// 	player.tp(d);
	// }

	// showGarageMenu(player) {
	// 	if (!player.isDriver()) return;
	// 	let execute = `app.id = ${this.id};`;
	// 	execute += `app.title = '${this.garage.basic.outBlipName}';`;
	// 	execute += `app.css = '${this.garage.basic.outBlipName.replace(/\s+/g, '')}.css';`;
	// 	player.call("cGarage-ShowVisitorsGarageMenu", [player.lang, execute, JSON.stringify(this.garage.basic.camData)]);
	// }

	// showLiftMenu(player) {
	// 	if (player.isDriver()) return;
	// 	let execute = `app.id = ${this.id};`;
	// 	execute += `app.title = '${this.garage.basic.outBlipName}';`;
	// 	execute += `app.css = '../Garage/${this.garage.basic.outBlipName.replace(/\s+/g, '')}.css';`;
	// 	player.call("cGarage-ShowVisitorsLiftMenu", [player.lang, execute]);
	// }

}
module.exports = Garage;

function getGarage(id) {
	for (let i = 0; i < garagesList.length; i++) {
		if (garagesList[i].garage.id === id) {
			return garagesList[i];
		}
	}
}
module.exports.getGarage = getGarage;


mp.events.add({	
	"sGarage-EnterVisitorsGarage" : (player, id, floor) => {
		const g = Garage.getGarage(id);
		g.enterGarage(player, floor);
	},
	"sGarage-EnterFloorByVisitorsLift" : (player, id, floor) => {
		const g = sBuilding.getBuilding(id);
		g.enterLift(player, floor);
	},
});