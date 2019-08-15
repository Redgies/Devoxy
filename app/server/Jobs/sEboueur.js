const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class Eboueur extends Job {
    constructor() {
        const d = {name: "Eboueur", x: -428.94, y: -1728.32, z: 19.784, rot: 0, dim: 0, blipmodel: 689}
        super(d);
        this.posToDrop = {x: -461.582, y: -1718.228, z: 18.641};
        this.posToGetVehicle = {x: -431.762, y: -1718.568, z: 19.014};
        this.checkPoints = [
            {x: -31.249, y: -1750.697, z: 29.135},
            {x: 89.51, y: -1442.977, z: 29.242},
            {x: 297.191, y: -1088.435, z: 29.401},
            {x: 113.463, y: -1942.946, z: 20.748},
            {x: -182.429, y: -1288.029, z: 31.296},
            {x: -711.832, y: -1136.869, z: 10.613},
            {x: -1447.184, y: -877.673, z: 10.795},
            {x: -1626.064, y: -441.152, z: 38.974},
            {x: -1359.553, y: -148.023, z: 48.524},
            {x: -990.892, y: -298.24, z: 37.815},
            {x: -707.972, y: -725.996, z: 28.684},
            {x: -359.82, y: -112.45, z: 38.697},
            {x: 545.16, y: -208.517, z: 53.862},
            {x: 648.783, y: 137.049, z: 91.412},
            {x: 499.019, y: -634.922, z: 24.847},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape": (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sEboueur-EnteredTreeShape", 2400]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sEboueur-EnteredDropShape", 2400]);
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
                        model: 'trash',
                        coord: JSON.stringify({x: -441.954, y: -1700.088, z: 18.936, rot: 166.23}),
                        id: 0,
                        title: 'Camion Poubelle',
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
            "sEboueur-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sEboueur-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sEboueur-StartWork": (player) => {
                this.startWork(player);
            },

            "sEboueur-FinishWork": (player) => {
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
        this.dropLabel = mp.labels.new("Decharge", new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z),
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
        player.call("cEboueur-OpenMainMenu", [player.lang, execute]);
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
        player.job.collected += 1;
        player.notify(`Vous avez ramassé ~g~${player.job.collected} ~w~poubelles.`);
        if (player.job.collected < 10) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Votre camion est plein, retournez à la décharge.`);
        this.dropMarker.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        if (player.job.collected === 0) return player.notify(`Vous n'avez pas livré de journaux !`);
        const earnedMoney = player.vip ? ((player.job.collected * 320) * 1.10) : player.job.collected * 320;
        player.changeMoney(+earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 50) player.addLoyality(player.job.collected / 10);
        misc.log.debug(`${player.name} earned $${earnedMoney} at éboueur job!`);
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

new Eboueur();
