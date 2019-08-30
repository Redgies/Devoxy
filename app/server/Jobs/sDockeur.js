const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class Dockeur extends Job {
    constructor() {
        const d = {name: "Dockeur", x: 1191.306, y: -3253.229, z: 6.029, rot: 0, dim: 0, blipmodel: 692}
        super(d);
        this.posToDrop = {x: 1201.117, y: -3238.879, z: 6.029};
        this.posToGetVehicle = {x: 1191.546, y: -3249.11, z: 6.029};
        this.checkPoints = [
            {x: 848.019, y: -2997.604, z: 5.901},
            {x: 1219.119, y: -2977.098, z: 5.866},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape": (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sDockeur-EnteredTreeShape", 100]);
                } else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sDockeur-EnteredDropShape", 100]);
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
                        model: 'handler',
                        coord: JSON.stringify({x: 1184.773, y: -3231.942, z: 6.014, rot: 0.46}),
                        id: 0,
                        title: 'Handler',
                        fuel: 1,
                        fuelTank: 50,
                        fuelRate: 250,
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
            "sDockeur-EnteredTreeShape": (player) => {
                this.enteredTreeShape(player);
            },

            "sDockeur-EnteredDropShape": (player) => {
                this.enteredDropShape(player);
            },

            "sDockeur-StartWork": (player) => {
                this.startWork(player);
            },

            "sDockeur-FinishWork": (player) => {
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
        this.dropMarker = mp.markers.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z - 1), 3,
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
        this.dropBlip = mp.blips.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z), {
            shortRange: true,
            scale: 0,
            color: 60,
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
        player.call("cDockeur-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        if (player.loyality < 60) return player.notify(`~r~${i18n.get('basic', 'needMoreLoyality1', player.lang)} 60 ${i18n.get('basic', 'needMoreLoyality2', player.lang)}!`);
        super.startWork(player);
        player.job.collected = 0;
        player.job = {name: this.name, collected: 0, activeTree: false};
        player.job.checkpoint = 0;
        this.dropMarker.showFor(player);
        this.createRandomCheckPoint(player);
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
        this.treeMarkersList[player.job.checkpoint].marker.showFor(player);
        this.treeMarkersList[player.job.checkpoint].blip.routeFor(player, 60, 0.7);
        player.routeBlip = this.treeMarkersList[player.job.checkpoint].blip;
        player.job.activeTree = player.job.checkpoint;
        // return i;
    }

    hideActiveCheckPoint(player) {
        if(player.job.collected <= 0) return 1;
        this.treeMarkersList[player.job.collected - 1].marker.hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        if(player.vehicle != player.locationJob)
            return player.notify("~r~Vous n'êtes pas dans votre véhicule de service.");

        if(player.job.checkpoint == 0)
        {
            player.job.checkpoint = 1;
        }
        else
        {
            player.job.checkpoint = 0;
            player.job.collected += 1;
            player.notify(`Vous avez chargé ~g~${player.job.collected} ~w~containers.`);
        }

        if (player.job.collected < 5) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Ce navire est prêt à partir, retournez à la rampe.`);
        this.dropBlip.routeFor(player, 60, 0.7);
    }

    enteredDropShape(player) {
        if (player.job.collected === 0) return player.notify(`Vous n'avez chargé aucun container !`);
        const earnedMoney = player.vip ? ((player.job.collected * 880) * 1.10) : player.job.collected * 880;
        player.changeMoney(+earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 70) player.addLoyality(2);
        misc.log.debug(`${player.name} earned $${earnedMoney} at dockeur job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        if(player.routeBlip)
            player.routeBlip.unrouteFor(player);
        if(player.locationJob)
            player.locationJob.destroy();
        player.locationJob = 0;
        super.finishWork(player);
    }
}

new Dockeur();

