const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');

class Weed {
    constructor(d)
    {
        this.pos = {};
        this.pos.x = -447.119;
        this.pos.y = -782.706;
        this.pos.z = 30.563;

        this.createShape();
        this.createEvents();
    }

    createEvents()
    {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.shape) {
                    player.notify("Appuyez ~b~E~w~ pour lui vendre la weed");
                    player.canWeed = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.shape)
                {
                    player.canWeed = false;

                    if(player.weedTimer != 25)
                    {
                        clearInterval(player.timer); 
                        player.notify("Vous annulez là transaction.");
                    }  
                }
            },
            "sKeys-E" : (player) => {
                if(player.canWeed) 
                {
                    player.weedTimer = 25;
                    player.timer = setInterval(() => {
                        player.weedTimer--;

                        player.notify(`Transaction en cours... ~b~${player.weedTimer} ~w~secondes.`);

                        if(player.weedTimer <= 1)
                        {
                            const inventory = player.getInventory();

                            inventory.forEach((item, index) => {
                                if(item.key == "item_weed")
                                {
                                    let amount = player.getItemAmount(item.key);

                                    player.removeItem(index, amount);
                                    player.giveItem("item_dirty_money", "Argent sale", amount * 250);

                                    player.notify(`Vous avez vendu de la weed (~g~+${amount * 250}$ en argent sale~w~).`);
                                    return 1;
                                }
                            });
                            clearInterval(player.timer); 
                        }
                    }, 1000);
                }
            },
        });        
    }

    createShape()
    {
        this.shape = mp.colshapes.newSphere(this.pos.x, this.pos.y, this.pos.z, 1);
        this.label = mp.labels.new("[point de vente]", new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
        {
            los: false,
            font: 2,
            drawDistance: 3,
            color: [255, 255, 255, 255],
        });
        this.marker = mp.markers.new(1, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z - 1), 0.75, 
        {
            color: [225, 255, 255, 50],
            visible: true,
        });
    }
}
new Weed();

module.exports = Weed;