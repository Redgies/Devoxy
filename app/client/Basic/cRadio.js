mp.events.add('playerEnterVehicle', (vehicle, seat) => {
    setInterval(function(){radio_sync();},1000);
});

function radio_sync() {
    var player = mp.players.local;
    if(player.vehicle){
    if(player.vehicle.getVariable('radio') == null){
        var radio_index = 0;
    }else{
        var radio_index = player.vehicle.getVariable('radio');
    }

        if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) // Check if player is in vehicle and is driver
        {
            if(radio_index != mp.game.invoke("0xE8AF77C4C06ADC93")){
            radio_index = mp.game.invoke("0xE8AF77C4C06ADC93");
            mp.events.callRemote('radiochange', radio_index);
            }
        }else{
            if(radio_index == 255){
                mp.game.audio.setRadioToStationName("OFF");
            }else{
                mp.game.invoke("0xF7F26C6E9CC9EBB8", true);
                mp.game.invoke("0xA619B168B8A8570F ", radio_index);
            }
            
        }
    }
};  