const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class Bus extends Job {
    constructor() {
        const d = {name: "Chauffeur de Bus", x: 450.842, y: -650.804, z: 28.445, rot: 0, dim: 0, blipmodel: 690}
        super(d);
        this.posToDrop = {x: 463.859, y: -622.322, z: 28.4};
        this.posToGetVehicle = {x: 450.594, y: -643.683, z: 28.487};
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
                    player.call("cMisc-CallServerEvenWithTimeout", ["sBus-EnteredTreeShape", 100]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sBus-EnteredDropShape", 100]);
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
                        model: 'bus',
                        coord: JSON.stringify({x: 461.571, y: -650.561, z: 28.045, rot: 172.88}),
                        id: 0,
                        title: 'Bus',
                        fuel: 1,
                        fuelTank: 50,
                        fuelRate: 20,
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
            "sBus-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sBus-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sBus-StartWork": (player) => {
                this.startWork(player);
            },

            "sBus-FinishWork": (player) => {
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
        this.dropLabel = mp.labels.new("Depot", new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z),
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
        player.call("cBus-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        if (player.loyality < 40) return player.notify(`~r~${i18n.get('basic', 'needMoreLoyality1', player.lang)} 40 ${i18n.get('basic', 'needMoreLoyality2', player.lang)}!`);
        super.startWork(player);
        player.job.collected = 0;
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
        if(player.job.collected <= 0) return;
        this.treeMarkersList[player.job.collected - 1].marker.hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        player.job.collected += 1;
        player.notify(`Vous avez passé ~g~${player.job.collected} ~w~arrêts.`);
        if (player.job.collected < 10) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Votre ligne est terminé, retournez au dépôt.`);
        this.dropMarker.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        if (player.job.collected === 0) return player.notify(`Vous n'êtes passé à aucuns arrêts !`);
        const earnedMoney = player.vip ? ((player.job.collected * 420) * 1.10) : player.job.collected * 420;
        player.changeMoney(+earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 50) player.addLoyality(2);
        misc.log.debug(`${player.name} earned $${earnedMoney} at bus job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        player.routeBlip.unrouteFor(player);
        if(player.locationJob)
            player.locationJob.destroy();
        player.locationJob = 0;
        super.finishWork(player);
    }


}

new Bus();
