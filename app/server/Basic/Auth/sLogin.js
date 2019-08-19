
const misc = require('../../sMisc');
const mailer = require('../../sMailer');
const logger = require('../../sGraylog');
const i18n = require('../../sI18n');
const playerSingleton = require('../sPlayer');
const AbstractAuth = require('./sAuthAbstract');



class LoginSingleton extends AbstractAuth {
    async tryLoginWithoutCode(player, obj) {
        const data = JSON.parse(obj);
        const pass = this.hashPassword(data.pass);
        const d = await misc.query(`SELECT id, email, password, socialclub FROM users WHERE email = '${data.email}' LIMIT 1`);
        if (!d[0]) {
            return this.showError(player, "Ce compte n'existe pas !");
        }
        if (d[0].password !== pass) {
            return this.showError(player, `Votre mot de passe est incorrect.`);
        }
        else if (this.isAlreadyPlaying(d[0].email)) {
            this.showError(player, `Vous ne pouvez pas vous connecter sur 2 appareils différents !`);
            player.loggedIn = false;
            return player.kick('Dublicate');
        }
        this.loadAccount(player, d[0].id);
    }

    isAlreadyPlaying(email) {
        const players = mp.players.toArray();
        for (const player of players) {
            if (!player.loggedIn) continue;
            if (player.email === email) return true;
        }
        return false;
    }

    async loadAccount(player, id) {
        delete player.verificationCode;
        delete player.verificationDate;
        delete player.verificationCodeTries;

        await playerSingleton.loadAccount(player, id);

        const onlinePlayers = mp.players.toArray();

        if (onlinePlayers.length < 30) {
            for (const p of onlinePlayers) {
                p.outputChatBox(`[${misc.getTime()}] ${player.name} [${player.id}] s'est connecté.`);
            }
        }
    }

    tryGetCodeToLogin(player, email) {
        if (!mailer.isEmailValid(email)) {
            return this.showError(player, "Email Invalid");
        }
        this.trySendCode(player, email);
    }

    async tryVipCode(player, code) {
        const d = await misc.query(`SELECT payment_status, payment_type, payment_code_used FROM paiements WHERE payment_code = '${code}' LIMIT 1`);
        if (!d[0]) {
            return this.showError(player, "Ce code n'éxiste pas !");
        }

        if(d[0].payment_code_used == 1)
        {
            return this.showError(player, "Ce code est déjà utilisé");
        }

        return this.showError(player, "Ce code est correct.");
    }

    async tryValidateCodeAndLogIn(player, obj) {
        const data = JSON.parse(obj);
        const pass = this.hashPassword(data.pass);
        if (!this.checkCode(player, data.code)) return;
        const d = await misc.query(`SELECT id, email, password FROM users WHERE email = '${data.email}' LIMIT 1`);
        if (!d[0]) {
            return this.showError(player, "Ce compte n'éxiste pas !");
        }
        if (d[0].password !== pass) {
            player.call("cInjectCef", [`app.showCode = false; app.enteredCode = "";`]);
            return this.showError(player, `Votre mot de passe est incorrect.`);
        }
        if (this.isAlreadyPlaying(d[0].email)) {
            this.showError(player, `Vous ne pouvez pas vous connecter sur 2 appareils différents !`);
            return player.kick('Dublicate');
        }
        this.loadAccount(player, d[0].id);
    }

}
const loginSingleton = new LoginSingleton();

mp.events.add({
    "sLogin-TryLoginWithoutCode" : async (player, obj) => {
        loginSingleton.tryLoginWithoutCode(player, obj);
    },

    "sLogin-TryGetCodeToLogin" : async (player, email) => {
        loginSingleton.tryGetCodeToLogin(player, email);
    },

    "sLogin-TryValidateCodeAndLogIn" : async (player, obj) => {
        loginSingleton.tryValidateCodeAndLogIn(player, obj);
    },
    "sVip-CheckCode" : async (player, code) => {
        loginSingleton.tryVipCode(player, code);
    },
});