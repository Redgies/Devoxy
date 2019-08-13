var tsBrowser = null;
var refresh = 0;
var oldDateTime = 0;
var debug = 1;
/* disable police & ambiant city sounds */
mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
mp.game.audio.startAudioScene("MIC1_RADIO_DISABLE");
tsBrowser = mp.browsers.new("package://RP/Browsers/ts3voice/index.html");
var streamedPlayers = [];
// mp.events.add("playerSpawn", playerSpawn);
// function playerSpawn(player){
//   var res = API.getScreenResolution();
//   tsBrowser = API.createCefBrowser(0, 0, false);
// }
mp.events.add('browserDomReady', (browser) => {
    if(debug) mp.gui.chat.push('Vocal ready');
    refresh = 1;
});


// mp.events.add('entityStreamIn', (entity) => {
//   if(entity.type == "player"){
//     streamedPlayers.push(entity);
//   }  
// });

// mp.events.add('entityStreamOut', (entity) => {
//   if(entity.type == "player"){
//     streamedPlayers.forEach(function(key, val){
//       if(val.id == entity.id) {
//         delete streamedPlayers[key];
//       }
//     })
    
//   }  
// });

var getStreamedPlayers = () => {
  let streamedPlayersArray = [];
  mp.players.forEachInStreamRange(
    (player, id) => {
      if(debug) mp.gui.chat.push("name : " + JSON.stringify(player.name));
      streamedPlayersArray.push(player);
    }
  );
  return streamedPlayersArray;
};
// API.onServerEventTrigger.connect(function (name, args) 
// {
//  if (name == "ConnectTeamspeak")
//  {
//    refresh = 1;
//  }
// });


setInterval(function(){
    // var dateTime = API.getGameTime();
    if (refresh == 1)// && (dateTime - oldDateTime) >= 500)
    {
      // oldDateTime = dateTime;
      var player = mp.players.local;
      if(debug) mp.gui.chat.push("PPOS:");
      if(debug) mp.gui.chat.push(JSON.stringify(player.position));
      var playerPos = player.position;
      var playerRot = player.getHeading();

      if(debug) mp.gui.chat.push(player.dimension);

      var rotation = Math.PI / 180 * (playerRot * -1);
      var streamedPlayers = getStreamedPlayers();

      var playerNames = new Array();
    //   if(debug) mp.gui.chat.push("streamedd player : " + JSON.stringify(streamedPlayers[0].name));
      
      // if (API.hasEntitySyncedData(player, "CALLING_PLAYER_NAME") && API.hasEntitySyncedData(player, "CALL_IS_STARTED") && API.getEntitySyncedData(player, "CALL_IS_STARTED").toString() == "1")
      // {
      //  var callingPlayerName = API.getEntitySyncedData(player, "CALLING_PLAYER_NAME");
      //  if (callingPlayerName != "")
      //  {
      //    playerNames.push(callingPlayerName + "~10~0~0~3");
      //  }
      // }
      for (var i = 0; i < streamedPlayers.length; i++)
      {
        var streamedPlayer = streamedPlayers[i];
        var streamedPlayerPos = streamedPlayers[i].position;
        var distance = mp.game.gameplay.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, streamedPlayerPos.x, streamedPlayerPos.y, streamedPlayerPos.z, false);
        // if(debug) mp.gui.chat.push(distance);
        var voiceRange = "Weit";//API.getEntitySyncedData(streamedPlayers[i], "VOICE_RANGE");
        var volumeModifier = 1;
        var range = 25;
        if (voiceRange == "Weit")
        {
          range = 50;
        }
        else if (voiceRange == "Kurz")
        {
          range = 5;
        }
        if (distance > 5)
        {
          volumeModifier = (distance * -5 / 10);
        }
        if (volumeModifier > 0)
        {
          volumeModifier = 0;
        }
        // if(debug) mp.gui.chat.push(volumeModifier);
        
        if(distance < range)
        {
          // var subPos = streamedPlayerPos.Subtract(playerPos);
          var subPos = {};
          if(debug) mp.gui.chat.push("player streamed : " + JSON.stringify(streamedPlayer.name));
          subPos.x = streamedPlayerPos.x - playerPos.x;
          subPos.y = streamedPlayerPos.y - playerPos.y;
          subPos.z = streamedPlayerPos.z - playerPos.z;

          var x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation);
          var y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation);
          
          x = x * 10 / range;
          y = y * 10 / range;
          
          var isDeath = 0;
          if (streamedPlayer.health > 0)
          {
            playerNames.push(streamedPlayers[i].name + "~" + (Math.round(x * 1000) / 1000) + "~" + (Math.round(y * 1000) / 1000) + "~0~" + (Math.round(volumeModifier * 1000) / 1000));
          }
          
        }
      }
      tsBrowser.url = "http://localhost:15555/players/" + player.name + "/" + playerNames.join(";") + "/";
      if(debug) mp.gui.chat.push("http://localhost:15555/players/" + player.name + "/" + playerNames.join(";") + "/");
      
    }
}, 1000);



// API.onResourceStop.connect(function() {
//  if (tsBrowser != null) {
//    refresh = false;
//    API.destroyCefBrowser(tsBrowser);
//  }
//  