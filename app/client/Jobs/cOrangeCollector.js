"use strict";

const misc = require('../cMisc');

mp.events.add({
    "cOrangeCollector-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/OrangeCollector/collector.html", lang);
        misc.injectCef(inject);
    },
    "cLivreurDeJournaux-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/LivreurDeJournaux/collector.html", lang);
        misc.injectCef(inject);
    },
    "cEboueur-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/Eboueur/collector.html", lang);
        misc.injectCef(inject);
    },
    "cPizza-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/Pizza/collector.html", lang);
        misc.injectCef(inject);
    },
    "cBus-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/Bus/collector.html", lang);
        misc.injectCef(inject);
    },
});       