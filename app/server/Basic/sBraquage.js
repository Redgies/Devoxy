const misc = require('../sMisc');

const braquageData = [
    {pos: {x: 28.221, y: -1339.338, z: 29.497}, color: 1} 
];


class Braquage {
    constructor(d)
    {
        this.pos = {};
        this.pos.x = d.pos.x;
        this.pos.y = d.pos.y;
        this.pos.z = d.pos.z;
        this.color = d.color;

        this.createEvents();
        this.createShape();
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
        this.marker = mp.markers.new(29, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z - 1), 0.75, 
        {
            color: [225, 255, 255, 50],
            visible: true,
        });
        mp.blips.new(351, new mp.Vector3(x, y, z),
		{
			name: "Superette",
			color: this.color,		
			shortRange: true,
			scale: 0.9,
		});
    }
}

for(let i = 0; i < braquageData.length; i++)
{
    new Braquage(braquageData[i]);
}

module.exports = Braquage;