mp.events.addCommand("tptest", (player, fullText, x, y, z, ipl) => {
    player.outputChatBox("You teleported.");
    player.position = new mp.Vector3(x,y,z);
    player.call('loadInterior', [x,y,z, ipl]);
    console.log('x: ' + x + ' y: ' + y + ' z: ' + z + ' ipl: ' + ipl);
});