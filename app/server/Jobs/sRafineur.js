const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class Rafineur extends Job {
    constructor() {
        const d = {name: "Raffineur", x: 2717.305, y: 1462.884, z: 24.501, rot: 0, dim: 0, blipmodel: 691}
        super(d);
        this.posToDrop = {x: 2735.925, y: 1448.377, z: 28.086};
        this.posToGetVehicle = {x: 2711.542, y: 1464.341, z: 24.501};
        this.checkPoints = [
            {x: 308.647, y: -762.751, z: 29.244},
            {x: 117.585, y: -785.561, z: 31.298},
            {x: -171.037, y: -816.288, z: 31.186},
            {x: -487.902, y: -805.703, z: 30.568},
            {x: -506.235, y: 18.672, z: 44.737},
            {x: -685.978, y: -279.696, z: 35.968},
            {x: -652.984, y: -606.963, z: 33.233},
            {x: -287.458, y: -1388.193, z: 31.256},
            {x: 92.96, y: -1724.242, z: 28.895},
            {x: 440.727, y: -2029.999, z: 23.515},
            {x: 953.223, y: -2092.698, z: 30.612},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape": (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sRafineur-EnteredTreeShape", 100]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sRafineur-EnteredDropShape", 100]);
                } else if (shape === this.vehicleShape) {
                    player.canGetVehicle = true;
                }
            },
            "playerExitColshape": (player, shape) => {
                if (shape === this.vehicleShape) {
                    player.canGetVehicle = false;
                }
            },
            "sKeys-E": (player) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;

                if (player.canGetVehicle) {
                    if (player.locationJob) return player.notify("~r~Vous avez déjà un véhicule de travail.");
                    const d = {
                        model: 'cerberus',
                        coord: JSON.stringify({x: 2689.165, y: 1470.643, z: 24.574, rot: 176.35}),
                        id: 0,
                        title: 'Cerberus',
                        fuel: 1,
                        fuelTank: 50,
                        fuelRate: 8,
                        price: 1,
                        ownerId: 0,
                        whoCanOpen: JSON.stringify([player.guid]),
                        factionId: 0,
                        tunning: JSON.stringify([]),
                        numberPlate: "JOB",
                        primaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                        secondaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                    }
                    player.locationJob = new Vehicle(d);
                }

            },
            "sRafineur-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sRafineur-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sRafineur-StartWork": (player) => {
                this.startWork(player);
            },

            "sRafineur-FinishWork": (player) => {
                this.finishWork(player);
            },

        });

        this.createMenuToDrop();
        this.createCheckpoints();
        this.createGetVehicle();
    }

    createGetVehicle() {
        this.vehicleMarker = mp.markers.new(1, new mp.Vector3(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z - 1), 0.75,
            {
                color: [255, 255, 255, 100],
                visible: true,
            });
        this.vehicleLabel = mp.labels.new("Vehicule de service", new mp.Vector3(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z),
            {
                los: false,
                font: 2,
                drawDistance: 3,
                color: [255, 255, 255, 255],
            });
        this.vehicleShape = mp.colshapes.newSphere(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z, 1);
    }

    createMenuToDrop() {
        this.dropMarker = mp.markers.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z - 1), 0.75,
        {
            color: [255, 165, 0, 100],
            visible: false,
        });
        this.dropLabel = mp.labels.new("Rampe", new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z),
        {
            los: false,
            font: 2,
            drawDistance: 5,
            color: [255, 255, 255, 255],
        });
        this.dropShape = mp.colshapes.newSphere(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z, 4);
    }

    createCheckpoints() {
        for (let i = 0; i < this.checkPoints.length; i++) {
            const marker = mp.markers.new(1, new mp.Vector3(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z - 1), 3,
                {
                    color: [255, 165, 0, 50],
                    visible: false,
                });
            const blip = mp.blips.new(1, new mp.Vector3(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z), {
                shortRange: true,
                scale: 0,
                color: 60,
            });
            marker.orangeCollectorTree = i;

            const obj = {marker, blip};
            this.treeMarkersList.push(obj);
            const colshape = mp.colshapes.newSphere(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z, 3);
            colshape.orangeCollectorTree = i;
        }
    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cRafineur-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        if (player.loyality < 40) return player.notify(`~r~${i18n.get('basic', 'needMoreLoyality1', player.lang)} 20 ${i18n.get('basic', 'needMoreLoyality2', player.lang)}!`);
        super.startWork(player);
        player.job = {name: this.name, collected: 0, activeTree: false};
        this.createRandomCheckPoint(player);
        this.dropMarker.showFor(player);
    }

    setWorkingClothesForMan(player) {
        // player.setProp(0, 14, 0); // Hat
        // player.setClothes(11, 78, misc.getRandomInt(0, 15), 0); // Top
        // player.setClothes(3, 14, 0, 0);
        // player.setClothes(252, 0, 0, 0);
        // player.setClothes(4, 0, misc.getRandomInt(0, 15), 0); // Legs
    }

    setWorkingClothesForWoman(player) {
        // player.setProp(0, 14, 0); // Hat
        // player.setClothes(11, 78, misc.getRandomInt(0, 7), 0); // Top
        // player.setClothes(3, 9, 0, 0);
        // player.setClothes(82, 0, 0, 0);
        // player.setClothes(4, 1, misc.getRandomInt(0, 15), 0); // Legs
    }

    createRandomCheckPoint(player) {
        this.hideActiveCheckPoint(player);
        this.treeMarkersList[player.job.collected].marker.showFor(player);
        this.treeMarkersList[player.job.collected].blip.routeFor(player, 60, 0.7);
        player.routeBlip = this.treeMarkersList[player.job.collected].blip;
        player.job.activeTree = player.job.collected;
        return i;
    }

    hideActiveCheckPoint(player) {
        if (typeof i !== "number") return;
        this.treeMarkersList[player.job.collected].marker.hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        player.job.collected += 1;
        player.notify(`Vous avez ravitaillé ~g~${player.job.collected} ~w~stations.`);
        if (player.job.collected < 10) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Votre camion est vide, retournez à la rampe.`);
        this.dropMarker.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        if (player.job.collected === 0) return player.notify(`Vous n'êtes passé à aucune station !`);
        const earnedMoney = player.vip ? ((player.job.collected * 580) * 1.10) : player.job.collected * 580;
        player.changeMoney(+earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 50) player.addLoyality(player.job.collected / 10);
        misc.log.debug(`${player.name} earned $${earnedMoney} at raffineur job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        player.routeBlip.unrouteFor(player);
        player.locationJob.destroy();
        player.locationJob = 0;
        super.finishWork(player);
    }


}

new Rafineur();
