const maxDistance = 25*25;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const color = [255,255,255,255];

mp.nametags.enabled = false; 

mp.events.add('render', (nametags) => {
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);
    
    nametags.forEach(nametag => {
        let [player, x, y, distance] = nametag;
        
        if(distance <= maxDistance) {	   
            let scale = (distance / maxDistance);
            if(scale < 0.6) scale = 0.6;
            
            y -= scale * (0.005 * (screenRes.y / 1080));
        
            graphics.drawText("NOUVEAU JOUEUR", 4, color, 0.4, 0.4, true, x, y);
        }
    });
});