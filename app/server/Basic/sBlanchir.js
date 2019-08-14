const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');

class Blanchir {
    constructor(d)
    {
        this.pos = {};
        this.pos.x = -426.496;
        this.pos.y = 6365.56;
        this.pos.z = 13.61;

        this.createShape();
        this.createEvents();
    }

    createEvents()
    {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.shape) {
                    player.notify("Appuyez ~b~E~w~ pour blanchir l'argent.");
                    player.canBlanchir = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.shape)
                {
                    player.canBlanchir = false;
                }
            },
            "sKeys-E" : (player) => {
                if(player.canBlanchir) 
                {
                    if(!player.whitewash) return player.notify("~r~Vous devez faire appel à un blanchisseur.");

                    const inventory = player.getInventory();

                    inventory.forEach((item, index) => {
                        if(item.key == "item_dirty_money")
                        {
                            let amount = player.getItemAmount(item.key);

                            player.removeItem(item, amount);
                            player.changeMoney(+amount);

                            player.notify(`Vous avez blanchi de l'argent sale (~g~+${amount}$~w~).`);
                            return 1;
                        }
                    });
                }
            },
        });        
    }

    createShape()
    {
        this.shape = mp.colshapes.newSphere(this.pos.x, this.pos.y, this.pos.z, 1);
        this.label = mp.labels.new("[blanchiement]", new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
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
new Blanchir();

module.exports = Blanchir;