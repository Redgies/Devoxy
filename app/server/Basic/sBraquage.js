const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');

const braquageData = [
    {id: 1, name: 'Superette', model: 351, price: 6000, pos: {x: 28.841, y: -1339.444, z: 29.497}, color: 1, time: 45, text: 'Braquage en cours à la ~r~superette rouge~w~.'},
    {id: 2, name: 'Superette', model: 351, price: 6000, pos: {x: -43.87, y: -1749.139, z: 29.421}, color: 3, time: 45, text: 'Braquage en cours à la ~b~superette bleue~w~.'},
    {id: 3, name: 'Superette', model: 351, price: 6000, pos: {x: -709.421, y: -904.421, z: 19.216}, color: 2, time: 45, text: 'Braquage en cours à la ~g~superette verte~w~.'}, 
    {id: 4, name: 'Superette', model: 351, price: 6000, pos: {x: 1159.85, y: -313.997, z: 69.205}, color: 5, time: 45, text: 'Braquage en cours à la ~y~superette jaune~w~.'},
    {id: 9, name: 'Superette', model: 351, price: 6000, pos: {x: 1707.593, y: 4920.299, z: 42.064}, color: 83, time: 45, text: 'Braquage en cours à la ~p~superette violette~w~.'},
    {id: 5, name: 'Bijouterie', model: 351, price: 11000, pos: {x: -630.854, y: -228.175, z: 38.057}, color: 4, time: 120, text: 'Braquage en cours à la bijouterie.'},
    {id: 6, name: 'Banque 1', model: 500, price: 30000, pos: {x: -1211.235, y: -335.391, z: 37.781}, color: 69, time: 300, text: 'Braquage en cours à la banque 1.'},
    {id: 7, name: 'Banque 2', model: 500, price: 30000, pos: {x: -2957.646, y: 481.879, z: 15.697}, color: 69, time: 300, text: 'Braquage en cours à la banque 2.'},
    {id: 8, name: 'Banque Centrale', model: 500, price: 300000, pos: {x: 265.095, y: 213.825, z: 101.68}, color: 69, time: 600, text: 'Braquage en cours à la banque centrale.'},
    {id: 7, name: 'Banque 3', model: 500, price: 30000, pos: {x: -103.478, y: 6477.758, z: 31.627}, color: 69, time: 300, text: 'Braquage en cours à la banque 3.'},
];
class Braquage {
    constructor(d)
    {
        this.id = d.id;
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
        this.name = d.name;
        this.model = d.model;
        this.price = d.price;

        this.createShape();
        this.createEvents();
    }

    createEvents()
    {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.shape) {
                    if(!this.used)
                    {
                        player.notify("Appuyez ~b~E~w~ pour commencer le braquage.");
                        player.canBraquage = this.id;
                    }
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
                if(player.canBraquage && this.id == player.canBraquage) 
                {
                    let playerWeapon = player.weapon;

                    if(playerWeapon == 2725352035) return player.notify("~r~Vous n'avez pas d'armes en mains.");

                    if(player.getCops() < 3) 
                        return player.notify("~r~Il n'y a pas assez de flics en ville.");

                    if(this.used) return player.notify("~r~Il y a déjà un braquage en cours.");
                    if(this.finish) return player.notify("~r~Vous ne pouvez pas encore braquer.");

                    for(const p of mp.players.toArray()) {
                        if(p.faction !== 1 || !p.working) continue;
                    
                        p.notifyWithPicture("Appel 911", "Braquage", this.text, "CHAR_CALL911");
                    }

                    this.used = 1;

                    this.timer = this.time;

                    this.timing = setInterval(() => {
                        this.timer--;

                        player.notify(`Il reste ~b~${this.timer} ~w~secondes.`);

                        if(this.timer <= 1) 
                        {
                            player.notify(`Braquage terminé beau goss (~g~+${this.price}$ en argent sale~g~).`);
                            player.giveItem("item_dirty_money", "Argent sale", this.price);
                            clearInterval(this.timing);

                            this.used = 0;
                            this.finish = 1;

                            setTimeout(() => {
                                this.finish = 0;
                            }, 900000);
                            player.canBraquage = false;
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
        mp.blips.new(this.model, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
		{
			name: this.name,
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