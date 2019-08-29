const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class LivreurDeColis extends Job {
    constructor() {
        const d = {name: "Livreur de colis", x: -423.005, y: -2788.771, z: 6, rot: 0, dim: 0, blipmodel: 688}
        super(d);
        this.posToDrop = {x: -444.86, y: -2791.573, z: 6};
        this.posToGetVehicle = {x: -415.95, y: -2796.662, z: 6};
        this.checkPoints = [
            {x: 140.984, y: -1729.193, z: 29.097},
            {x: 274.43, y: -1893.985, z: 26.727},
            {x: 279.063, y: -1034.578, z: 29.081},
            {x: -798.165, y: -584.821, z: 30.103},
            {x: -1327.371, y: -394.552, z: 36.446},
            {x: -1531.44, y: -441.668, z: 34.965},
            {x: -1495.026, y: -385.891, z: 39.984},
            {x: 524.47, y: -179.459, z: 53.791},
            {x: -212.958, y: -1306.048, z: 31.346},
            {x: -369.015, y: -109.171, z: 38.68},
            {x: -1238.802, y: -295.31, z: 37.542},
            {x: -2193.458, y: -375.794, z: 13.231},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape": (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sLivreurDeColis-EnteredTreeShape", 100]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sLivreurDeColis-EnteredDropShape", 100]);
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
                        model: 'benson',
                        coord: JSON.stringify({x: -406.577, y: -2798.557, z: 5.977, rot: 314.49}),
                        id: 0,
                        title: 'Benson',
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
            "sLivreurDeColis-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sLivreurDeColis-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sLivreurDeColis-StartWork": (player) => {
                this.startWork(player);
            },

            "sLivreurDeColis-FinishWork": (player) => {
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
        this.dropLabel = mp.labels.new("Bureau", new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z),
            {
                los: false,
                font: 2,
                drawDistance: 3,
                color: [255, 255, 255, 255],
            });
        this.dropBlip = mp.blips.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z), {
            shortRange: true,
            scale: 0,
            color: 60,
        });
        this.dropShape = mp.colshapes.newSphere(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z, 1);
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
        player.call("cLivreurDeColis-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        if (player.loyality < 20) return player.notify(`~r~${i18n.get('basic', 'needMoreLoyality1', player.lang)} 20 ${i18n.get('basic', 'needMoreLoyality2', player.lang)}!`);
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
        const i = misc.getRandomInt(0, this.checkPoints.length - 1)
        if (i === player.job.activeTree) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        this.treeMarkersList[i].marker.showFor(player);
        this.treeMarkersList[i].blip.routeFor(player, 60, 0.7);
        player.routeBlip = this.treeMarkersList[i].blip;
        player.job.activeTree = i;
        return i;
    }

    hideActiveCheckPoint(player) {
        const i = player.job.activeTree;
        if (typeof i !== "number") return;
        this.treeMarkersList[i].marker.hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        if(player.vehicle != player.locationJob)
            return player.notify("~r~Vous n'êtes pas dans votre véhicule de service.");

        player.job.collected += 1;
        player.notify(`Vous avez livrés ~g~${player.job.collected} ~w~adresses.`);
        if (player.job.collected < 5) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Vous n'avez plus de colis, retournez au bureau.`);
        this.dropBlip.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        if (player.job.collected === 0) return player.notify(`Vous n'avez pas livré de colis !`);
        const earnedMoney = player.vip ? (player.job.collected * 370 * 1.10) : player.job.collected * 370;
        player.changeMoney(earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 30) player.addLoyality(2);
        misc.log.debug(`${player.name} gagne $${earnedMoney} en tant que livreur de colis!`);
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

new LivreurDeColis();
