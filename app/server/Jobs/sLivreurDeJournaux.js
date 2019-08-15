const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class LivreurDeJourneaux extends Job {
    constructor() {
        const d = {name: "Livreur de journaux", x: -318.839, y: -609.888, z: 33.558, rot: 0, dim: 0, blipmodel: 687}
        super(d);
        this.posToDrop = {x: -292.263, y: -600.794, z: 33.553};
        this.posToGetVehicle = {x: -311.542, y: -607.759, z: 33.557};
        this.checkPoints = [
            {x: -267.566, y: -688.141, z: 33.107},
            {x: -259.905, y: -845.839, z: 31.03},
            {x: 6.171, y: -933.852, z: 29.515},
            {x: 44.157, y: -802.981, z: 31.516},
            {x: -111.402, y: -597.718, z: 36.281},
            {x: -51.16, y: -584.594, z: 36.824},
            {x: -260.933, y: -894.202, z: 31.22},
            {x: -285.577, y: -1062.625, z: 27.206},
            {x: -520.235, y: -854.849, z: 30.343},
            {x: -608.25, y: -802.205, z: 25.195},
            {x: -529.012, y: -677.868, z: 33.671},
            {x: -50.459, y: -215.367, z: 45.798},
            {x: 247.551, y: -345.546, z: 44.465},
            {x: 271.631, y: -434.075, z: 45.247},
            {x: 228.259, y: -572.235, z: 43.873},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape": (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sLivreurDeJournaux-EnteredTreeShape", 2400]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sLivreurDeJournaux-EnteredDropShape", 2400]);
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
                        model: 'fixter',
                        coord: JSON.stringify({x: -308.028, y: -608.843, z: 33.557, rot: 264.85}),
                        id: 0,
                        title: 'Fixter',
                        fuel: 1,
                        fuelTank: 5,
                        fuelRate: 0,
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
            "sLivreurDeJournaux-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sLivreurDeJournaux-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sLivreurDeJournaux-StartWork": (player) => {
                this.startWork(player);
            },

            "sLivreurDeJournaux-FinishWork": (player) => {
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
        player.call("cLivreurDeJournaux-OpenMainMenu", [player.lang, execute]);
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
        player.stopAnimation();
        player.job.collected += 1;
        player.notify(`Vous avez livrés ~g~${player.job.collected} ~w~adresses.`);
        if (player.job.collected < 10) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Vous n'avez plus de journaux, retournez au bureau.`);
        this.dropMarker.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        player.stopAnimation();
        if (player.job.collected === 0) return player.notify(`Vous n'avez pas livré de journaux !`);
        const earnedMoney = player.vip ? (player.job.collected * 220 * 1.10) : player.job.collected * 220;
        player.changeMoney(earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 40) player.addLoyality(player.job.collected / 10);
        misc.log.debug(`${player.name} earned $${earnedMoney} at livreur de journaux job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        player.locationJob.destroy();
        player.locationJob = 0;
        super.finishWork(player);
    }


}

new LivreurDeJourneaux();
