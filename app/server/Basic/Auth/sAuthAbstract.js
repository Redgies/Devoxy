const crypto = require('crypto');
const misc = require('../../sMisc');
const mailer = require('../../sMailer');


class AbstractAuth {
    showError(player, text) {
        player.call("cInjectCef", [`app.showError("${text}");`]);
    }

    sendCode(player, email) {
        const code = misc.getRandomInt(100, 999);
        player.verificationCode = code;
        player.verificationDate = new Date().getTime();
        player.verificationCodeTries = 0;
        const mail = {
            from: `${mailer.getMailAdress()}`,
            to: `${email}`,
            subject: `Code de vérification : ${code}`,
            text: `Votre code de vérification est : ${code}`,
            html: `<b>Bonjour !</b><br>Votre code de vérification est : ${code}`,
        }
        mailer.sendMail(mail);
        player.call("cInjectCef", [`app.showInfo('Vérifiez vos mails !');`]);
    }

    hashPassword(str) {
        const cipher = crypto.createCipher('aes192', 'a pass');
        let encrypted = cipher.update(str, 'utf8', 'hex'); 
        encrypted += cipher.final('hex');
        return encrypted;
    }

    canCheckCode(player) {
        if (player.verificationCodeTries < 5) return true;
        this.showError(player, `Too many wrong codes`);
        player.loggedIn = false;
        graylog.log(`${player.socialClub} too many wrong codes.`, `${player.socialClub} too many wrong codes.`, 'error');
        misc.log.warn(`${player.socialClub} too many wrong codes`);
        player.kick('Vous avez essayé trop de fois un mauvais code.');
        return false;
    }

    checkCode(player, code) {
        // if (!this.canCheckCode(player)) return false;
        // if (player.verificationCode !== code) {
        //     player.verificationCodeTries++;
        //     this.showError(player, `Code incorrect !`);
        //     return false;
        // }
        return true;
    }
}
module.exports = AbstractAuth;