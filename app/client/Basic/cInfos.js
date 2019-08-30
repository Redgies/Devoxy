let speedo = mp.browsers.new("package://RP/Browsers/Infos/infos.html");
let showed = false;
let player = mp.players.local;

let money;
let job = 'Aucune faction';
let id;
let guid;
let radio;

mp.events.add({
    "cMoney-Update" : (value) => { 
        money = value
    },
    "cJob-Update" : (value) => {
        job = value;
    },
    "cId-Update" : (value) => {
        id = value;
    },
    "cGuid-Update" : (value) => {
        guid = value;
    },
    "cRadio-Update" : (value) => {
        radio = value;
    },
    "playerStartTalking": (p) => 
    {
        p.playFacialAnim("mic_chatter", "mp_facial");
    },
    "playerStopTalking": (p) => 
    {
        p.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
    },
    "render": () =>
    {
        speedo.execute(`updateMoney(${money}, '${job}', ${id}, ${guid}, ${radio});`);  

        mp.game.player.restoreStamina(100);

        if(player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
            {
                if(showed === false)
                {
                    speedo.execute("showSpeedo();");
                    showed = true;
                }

                let vel1 = Math.ceil(player.vehicle.getSpeed() * (player.vehicle.getSpeed() / 20) * 2);
                let vel = (vel1).toFixed(0);
                let gas = player.vehicle.getPetrolTankHealth();
                gas = gas < 0 ? 0: gas / 10;
                
                speedo.execute(`update(${vel}, ${gas});`);
            }
            else
            {
                if(showed)
                {
                    speedo.execute("hideSpeedo();");
                    showed = false;
                }
            }
        }
    }
);