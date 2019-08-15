const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');

class Pizza extends Job {
    constructor() {
        const d = { name: "Livreur de pizza", x: -1182.947, y: -884.062, z: 13.755, rot: 0, dim: 0 }
        super(d);
        this.posToDrop = {x: -1176.807, y: -890.748, z: 13.807};
        this.posToGetVehicle = {x: -1174.217, y: -874.52, z: 14.118};
        this.checkPoints = [
            {x: -1206.693, y: -1263.474, z: 6.963 },
            {x: -1108.959, y: -1527.616, z: 6.78 },
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sPizza-EnteredTreeShape", 2400]);
                }
                else if (shape === this.dropShape) {
                    player.call("cMisc-CallServerEvenWithTimeout", ["sPizza-EnteredDropShape", 2400]);
                }
                else if (shape === this.vehicleShape) {
                    player.canGetVehicle = true;
                    player.outputChatBox("true");
                }
            },
            "playerExitColshape" : (player, shape) => {
                if (shape === this.vehicleShape) {
                    player.canGetVehicle = false;
                    player.outputChatBox("false");
                }
            },
            "sKeys-E" : (player) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;

                if(player.canGetVehicle)
                {
                    if (player.locationJob) return player.notify("~r~Vous avez déjà un véhicule de travail.");
                    const d = {
                        model: 'faggio3',
                        coord: JSON.stringify({x: -1169.767, y: -879.483, z: 13.638, rot: 117.68}),
                        id: 0,
                        title: 'Faggio 3',
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
            "sPizza-EnteredTreeShape" : (player) => {
                this.enteredTreeShape(player);
            },

            "sPizza-EnteredDropShape" : (player) => {
                this.enteredDropShape(player);
            },

            "sPizza-StartWork" : (player) => {
                this.startWork(player);
            },

            "sPizza-FinishWork" : (player) => {
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
        this.vehicleShape = mp.colshapes.newSphere(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z, 1);
    }

    setLocalSettings() {
        this.blip.model = 514;
        this.blip.color = 17;
    }

    createMenuToDrop() {
        this.dropMarker = mp.markers.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z - 1), 0.75,
            {
                color: [255, 165, 0, 100],
                visible: false,
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
            marker.orangeCollectorTree = i;
            this.treeMarkersList.push(marker);
            const colshape = mp.colshapes.newSphere(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z, 3);
            colshape.orangeCollectorTree = i;
        }
    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cPizza-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        if (player.loyality < 40) return player.notify(`~r~${i18n.get('basic', 'needMoreLoyality1', player.lang)} 40 ${i18n.get('basic', 'needMoreLoyality2', player.lang)}!`);
        super.startWork(player);
        player.job = { name: this.name, collected: 0, activeTree: false };
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
        this.treeMarkersList[i].showFor(player);
        player.job.activeTree = i;
        return i;
    }

    hideActiveCheckPoint(player) {
        const i = player.job.activeTree;
        if (typeof i !== "number") return;
        this.treeMarkersList[i].hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        player.stopAnimation();
        player.job.collected += misc.getRandomInt(1, 2);
        player.notify(`Vous avez livrés ~g~${player.job.collected} ~w~adresses.`);
        if (player.job.collected < 20) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~Vous n'avez plus de pizza, retournez à la pizzeria.`);
    }

    enteredDropShape(player) {
        player.stopAnimation();
        if (player.job.collected === 0) return player.notify(`Vous n'avez pas livré de pizza !`);
        const earnedMoney = player.vip ? (player.job.collected * 220 * 1.10) : player.job.collected * 220;
        player.changeMoney(earnedMoney);
        player.notify(`Vous gagnez ~g~$${earnedMoney} ! ~w~Continuez !`);
        if (player.loyality < 50) player.addLoyality(player.job.collected / 10);
        misc.log.debug(`${player.name} earned $${earnedMoney} at livreur de pizzas job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        player.locationJob.destroy();
        super.finishWork(player);
    }


}
new Pizza();
