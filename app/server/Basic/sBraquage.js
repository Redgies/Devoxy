const misc = require('../sMisc');

const braquageData = [
    {pos: {x: 28.221, y: -1339.338, z: 29.497}, color: 1, time: 30} 
];


class Braquage {
    constructor(d)
    {
        this.pos = {};
        this.pos.x = d.pos.x;
        this.pos.y = d.pos.y;
        this.pos.z = d.pos.z;
        this.color = d.color;
        this.timer = 0;
        this.time = d.time;

        this.createShape();
        this.createEvents();
    }

    createEvents()
    {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                player.notify("ntm");
                if(shape === this.shape) {
                    player.notify("Appuyez ~b~E~w~ pour commencer le braquage.");
                    player.canBraquage = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.shape)
                    player.canBraquage = false;
            },
            "sKeys-E" : (player) => {
                if(player.canBraquage) 
                {
                    let playerWeapon = player.weapon;

                    if(playerWeapon == 2725352035) return player.notify("~r~Vous n'avez pas d'armes en mains.");

                    this.timer = this.time;

                    let timing = setInterval(() => {
                        this.timer--;

                        player.notify(`Il reste ${this.timer} secondes.`);

                        if(this.timer <= 0) 
                        {
                            player.notify(`Braquage terminé bogoss !`);
                            clearInterval(timing);
                        }
                    }, 1000);
                }
            },
        });        
    }

    createShape()
    {
        this.shape = mp.colshapes.newSphere(this.pos.x, this.pos.y, this.pos.z, 1);
        this.label = mp.labels.new("[braquage]", new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
        {
            los: false,
            font: 2,
            drawDistance: 3,
            color: [255, 255, 255, 255],
        });
        this.marker = mp.markers.new(29, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z), 0.75, 
        {
            color: [225, 255, 255, 50],
            visible: true,
        });
        mp.blips.new(351, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
		{
			name: "Superette",
			color: this.color,		
			shortRange: true,
			scale: 1,
		});
    }
}

for(let i = 0; i < braquageData.length; i++)
{
    new Braquage(braquageData[i]);
}

module.exports = Braquage;