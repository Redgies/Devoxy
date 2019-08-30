const propertyName = "__tyreSmokeColor";

function setTyreSmokeColor(vehicle, data) {
    if (data) {
        const [red, green, blue] = data.split("|");

        vehicle.toggleMod(20, true);
        vehicle.setTyreSmokeColor(Number(red), Number(green), Number(blue));
    } else {
        vehicle.toggleMod(20, false);
        vehicle.setTyreSmokeColor(255, 255, 255);
    }
}

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "vehicle") {
        setTyreSmokeColor(entity, entity.getVariable(propertyName));
    }
});

mp.events.addDataHandler(propertyName, (entity, value) => {
    if (entity.type === "vehicle") {
        setTyreSmokeColor(entity, value);
    }
});