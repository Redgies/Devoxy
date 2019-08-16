const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const Vehicle = require('../Basic/Vehicles/sVehicle');



class Prisonnier extends Job {
    constructor() {
        const d = { name: "Prisonnier", x: 1689.234, y: 2551.429, z: 45.565, rot: 0, dim: 0, blipmodel: 188 }
        super(d);
        this.posToDrop = {x: 1695.135, y: 2537.809, z: 45.565};
        // this.posToGetVehicle = {x: 402.508, y: 6513.289, z: 27.775};
        this.checkPoints = [
            {x: 1711.883, y: 2555.059, z: 45.565},
            {x: 1723.209, y: 2550.768, z: 45.565},
            {x: 1727.59, y: 2541.273, z: 45.565},
            {x: 1727.355, y: 2532.976, z: 45.565},
            {x: 1717.373, y: 2530.212, z: 45.565},
            {x: 1698.861, y: 2526.461, z: 45.565},
            {x: 1699.477, y: 2508.188, z: 45.565},
            {x: 1687.608, y: 2500.878, z: 45.565},
            {x: 1671.577, y: 2506.43, z: 45.565},
            {x: 1666.845, y: 2526.812, z: 45.571},
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (shape.orangeCollectorTree === player.job.activeTree) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sPrisonnier-EnteredTreeShape", 2400]);
                }
                else if (shape === this.dropShape) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sPrisonnier-EnteredDropShape", 2400]);
                }
                // else if (shape === this.vehicleShape) {
                //     player.canGetVehicle = true;  
                //     player.outputChatBox("true");
                // } 
            },
            // "playerExitColshape" : (player, shape) => {
            //     if (shape === this.vehicleShape) {
            //         player.canGetVehicle = false; 
            //         player.outputChatBox("false"); 
            //     } 
            // },
            "sKeys-E" : (player) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
               
                // if(player.canGetVehicle)
                // {
                //     if (player.locationJob) return player.notify("~r~Vous avez déjà un véhicule de travail.");
                //     const d = {
                //         model: 'faggio2',
                //         coord: JSON.stringify({x: 395.912, y: 6514.077, z: 27.776, rot: 175.7}),
                //         id: 0,
                //         title: 'Pegassi Faggio',
                //         fuel: 1,
                //         fuelTank: 5,
                //         fuelRate: 2,
                //         price: 1,
                //         ownerId: 0,
                //         whoCanOpen: JSON.stringify([player.guid]),
                //         factionId: 0,
                //         tunning: JSON.stringify([]),
                //         numberPlate: "JOB",
                //         primaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                //         secondaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                //     }
                //     player.locationJob = new Vehicle(d);
                // }

            },
            "sPrisonnier-EnteredTreeShape" : (player) => {
                this.enteredTreeShape(player);
            },

            "sPrisonnier-EnteredDropShape" : (player) => {
                this.enteredDropShape(player);
            },
        
            "sPrisonnier-StartWork" : (player) => {
                this.startWork(player);
            },
        
            "sPrisonnier-FinishWork" : (player) => {
                this.finishWork(player);
            },
        
        });

        this.createMenuToDrop();
        this.createCheckpoints();
        // this.createGetVehicle();
    }

    // createGetVehicle() {
    //     this.vehicleMarker = mp.markers.new(1, new mp.Vector3(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z - 1), 0.75,
    //     {
    //         color: [255, 255, 255, 100],
    //         visible: true,
    //     });
    //     this.vehicleShape = mp.colshapes.newSphere(this.posToGetVehicle.x, this.posToGetVehicle.y, this.posToGetVehicle.z, 1);        
    // }

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
        if (player.job.name === this.name) return this.finishWork(player);
        this.startWork(player);
    }

    startWork(player) {
        super.startWork(player);
        player.job = { name: this.name, collected: 0, activeTree: false };
        this.createRandomCheckPoint(player);
        this.dropMarker.showFor(player);
    }

    setWorkingClothesForMan(player) {
    }

    setWorkingClothesForWoman(player) {
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
        player.notify(`Vous avez ramassé ~g~${player.job.collected} ~w~ déchets !`);
        if (player.job.collected < 10) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`Vous devez déposer les déchets à la poubelle !`);
    }

    enteredDropShape(player) {
        player.stopAnimation();
        if (player.job.collected === 0) return player.notify(`${i18n.get('sPrisonnier', 'empty', player.lang)}!`);
        const earnedMoney = player.vip ? (player.job.collected * 200 * 1.10) : player.job.collected * 200;
        player.changeMoney(earnedMoney);
        player.notify(`Le pénitencier vous récompense de ~g~${earnedMoney}$ ! ~w~ Continuez !`);
        misc.log.debug(`${player.name} earned $${earnedMoney} at prisonnier job!`);
        player.job.collected = 0;
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        // player.locationJob.destroy();
        super.finishWork(player);
    }

    
}
new Prisonnier();
