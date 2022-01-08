"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var random = (max, min = 1, decimals = false) => decimals ? Math.random() * (max - min) + min : Math.round(Math.random() * (max - min)) + min;
var firstUpperCase = (str) => str.split(' ').map((word) => word.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')).join(' ');
var randomUpperCase = (str) => str.split('').map((char) => random(2) == 2 ? char.toLowerCase() : char.toUpperCase()).join('');
var pad = (n, z = 2) => ('00' + n).slice(-z);
var msToTime = (ms) => pad(ms / 3.6e6 | 0) + ':' + pad((ms % 3.6e6) / 6e4 | 0) + ':' + pad((ms % 6e4) / 1000 | 0);
var removeItem = (array, item) => { var i = array.indexOf(item); if (i !== -1)
    return array.splice(i, 1); };
var makeError = (d, description, type, color = '#001', avatar = d.author.displayAvatarURL({ dynamic: true, size: 4096 })) => {
    if (!d.suppressUpperCase) {
        type = firstUpperCase(type);
        description = firstUpperCase(description);
    }
    return {
        title: `${d.emotes.error} | Error ${type ? `>> ${type}` : ''}`,
        thumbnail: {
            url: avatar
        },
        description: `\`\`\`\n${description}\n\`\`\``,
        color: color
    };
};
var reboot = () => { try {
    console.log('\n|--------------[Rebooting]--------------|\n');
    process.on('exit', () => { require('child_process').spawn(process.argv.shift(), process.argv, { cwd: process.cwd(), detached: !0, stdio: 'inherit' }); });
    process.exit();
}
catch (error) {
    console.log(error);
} };
module.exports = {
    random: random,
    msToTime: msToTime,
    removeItem: removeItem,
    makeError: makeError,
    snowflake: (n = 10) => { var str = ''; for (; n > 0;)
        str = str + (Math.round(Math.random() * 8)), n--; return str; },
    reboot: reboot,
    findUser: (d, target) => __awaiter(void 0, void 0, void 0, function* () { target = target.toLowerCase(); try {
        return ((yield d.client.users.cache.find((m) => (m === null || m === void 0 ? void 0 : m.username.toLowerCase()) === target || (m === null || m === void 0 ? void 0 : m.tag.toLowerCase()) === target)) || (yield d.client.users.cache.get(target)) || (yield d.msg.mentions.users.first()) || (yield d.client.users.fetch(target)) || { id: undefined });
    }
    catch (_a) {
        return { id: undefined };
    } }),
    findMember: (d, target, guild = d.guild) => { target = target.toLowerCase(); return guild.members.cache.find((m) => m.id === target || m.username.toLoweCase() === target || m.username.toLoweCase() + '#' + m.discriminator === target); },
    randomUpperCase: randomUpperCase,
    firstUpper: firstUpperCase
};
