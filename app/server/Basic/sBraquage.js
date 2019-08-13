const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');

const braquageData = [
    {pos: {x: 28.221, y: -1339.338, z: 29.497}, color: 1, time: 30, text: 'Braquage en cours à la ~r~superette rouge~w~.'},
    {pos: {x: -43.313, y: -1748.448, z: 29.421}, color: 3, time: 30, text: 'Braquage en cours à la ~b~superette bleue~w~.'},
    {pos: {x: -709.421, y: -904.421, z: 19.216}, color: 2, time: 30, text: 'Braquage en cours à la ~g~superette verte~w~.'}, 
    {pos: {x: 1159.85, y: -313.997, z: 69.205}, color: 5, time: 30, text: 'Braquage en cours à la ~g~superette jaune~w~.'} ,
    {pos: {x: -1220.433, y: -911.623, z: 12.326}, color: 7, time: 30, text: 'Braquage en cours à la ~g~superette violette~w~.'} 
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
        this.text = d.text;
        this.used = 0;
        this.finish = 0;
        this.timing;

        this.createShape();
        this.createEvents();
    }

    createEvents()
    {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.shape) {
                    player.notify("Appuyez ~b~E~w~ pour commencer le braquage.");
                    player.canBraquage = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.shape)
                {
                    if(player.canBraquage)
                    {
                        clearInterval(this.timing); 
                        if(this.used)
                            player.notify("~r~Vous êtes sorti de la zone.");
                        this.used = 0;
                    }
                    player.canBraquage = false;
                }
            },
            "sKeys-E" : (player) => {
                if(player.canBraquage) 
                {
                    let playerWeapon = player.weapon;

                    if(playerWeapon == 2725352035) return player.notify("~r~Vous n'avez pas d'armes en mains.");
                    if(this.used) return player.notify("~r~Il y a déjà un braquage en cours.");
                    if(this.finish) return player.notify("~r~Vous ne pouvez pas encore braquer.");

                    for(const p of mp.players.toArray()) {
                        if(p.faction !== 1 && p.working !== 1) continue;
                    
                        p.notifyWithPicture("Appel 911", "Braquage", this.text, "CHAR_CALL911");
                    }

                    this.used = 1;

                    this.timer = this.time;

                    this.timing = setInterval(() => {
                        this.timer--;

                        player.notify(`Il reste ~b~${this.timer} ~w~secondes.`);

                        if(this.timer <= 1) 
                        {
                            player.notify(`Braquage terminé beau goss (~g~+6000$ en argent sale~g~).`);
                            player.giveItem("item_dirty_money", "Argent sale", 6000);
                            clearInterval(this.timing);

                            this.used = 0;
                            this.finish = 1;

                            setTimeout(() => {
                                this.finish = 0;
                            }, 30000);
                            player.canBraquage = false;
                        }
                    }, 1000);
                }
            },
        });        
    }

    createShape()
    {
        this.shape = mp.colshapes.newSphere(this.pos.x, this.pos.y, this.pos.z, 3);
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