mp.events.add('loadInterior', (x,y,z,ipl) => {
    var interior = mp.game.interior.getInteriorAtCoords(x, y, z);
    mp.game.interior.enableInteriorProp(interior, ipl);
    mp.game.interior.refreshInterior(interior);
});