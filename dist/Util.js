"use strict";
var firstUpper = (str) => str.split(' ').map((word) => word.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')).join(' ');
var randomUpperCase = (str) => str.split('').map((char) => random(2) == 2 ? char.toLowerCase() : char.toUpperCase()).join('');
var pad = (n, z = 2) => ('00' + n).slice(-z);
var msToTime = (ms) => pad(ms / 3.6e6 | 0) + ':' + pad((ms % 3.6e6) / 6e4 | 0) + ':' + pad((ms % 6e4) / 1000 | 0);
var removeItem = (array, item) => { var i = array.indexOf(item); if (i !== -1)
    return array.splice(i, 1); };
var makeError = (d, description, type, color = '#001', avatar = d.author.displayAvatarURL({ dynamic: true, size: 4096 })) => {
    if (!d.suppressUpperCase) {
        type = type?.fup();
        description = description?.fup();
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
var makeEmbed = (d, title, desc = '', fields = [], thumb = d.author.displayAvatarURL({ dynamic: !0, size: 4096 }), color = '#001') => {
    return {
        title,
        description: desc,
        thumbnail: { url: thumb },
        fields,
        color
    };
};
var makeFields = (...fields) => {
    return fields.map((f) => { return { name: f[0], value: f[1], inline: f[2] || !1 }; });
};
var codeblock = (str, n = '') => '```' + n + '\n' + str + '```';
var reboot = () => { try {
    console.log('\n|--------------[Rebooting]--------------|\n');
    process.on('exit', () => { require('child_process').spawn(process.argv.shift(), process.argv, { cwd: process.cwd(), detached: !0, stdio: 'inherit' }); });
    process.exit();
}
catch (error) {
    console.log(error);
} };
var color = {
    black: (str) => `\x1b[0m\x1b[30m${str}\x1b[0m`,
    red: (str) => `\x1b[0m\x1b[31m${str}\x1b[0m`,
    green: (str) => `\x1b[0m\x1b[32m${str}\x1b[0m`,
    yellow: (str) => `\x1b[0m\x1b[33m${str}\x1b[0m`,
    blue: (str) => `\x1b[0m\x1b[34m${str}\x1b[0m`,
    magenta: (str) => `\x1b[0m\x1b[35m${str}\x1b[0m`,
    cyan: (str) => `\x1b[0m\x1b[36m${str}\x1b[0m`,
    white: (str) => `\x1b[0m\x1b[37m${str}\x1b[0m`,
    custom: (str, n) => `\x1b[0m\x1b[${n}m${str}\x1b[0m`,
};
var type = (x) => {
    var t = typeof x;
    if (t === 'object') {
        if (Array.isArray(x)) {
            t = 'array';
        }
        else if (Buffer.isBuffer(x)) {
            t = 'buffer';
        }
        else if (x === null) {
            t = 'null';
        }
        else if (x === undefined) {
            t = 'undefined';
        }
        else
            t = 'object';
    }
    return t;
};
var { SlashCommandSubcommandBuilder } = require('@discordjs/builders');
var subCmdParser = (data) => {
    var slash = new SlashCommandSubcommandBuilder()
        .setName(data.name)
        .setDescription(data.desc);
    if (data.opts) {
        data.opts.forEach((opt, i) => {
            switch (opt.type) {
                case 'str':
                    slash.addStringOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        return _;
                    });
                    break;
                case 'bool':
                    slash.addBooleanOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        return _;
                    });
                    break;
                case 'ch':
                    slash.addChannelOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        if (opt.chTypes) {
                            _.addChannelTypes(opt.chTypes);
                        }
                        return _;
                    });
                    break;
                case 'int':
                    slash.addIntegerOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        _.setMinValue(opt.min);
                        _.setMaxValue(opt.max);
                        return _;
                    });
                    break;
                case 'mention':
                    slash.addMentionableOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        return _;
                    });
                    break;
                case 'user':
                    slash.addUserOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        return _;
                    });
                    break;
                case 'role':
                    slash.addRoleOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        return _;
                    });
                    break;
                case 'num':
                    slash.addNumberOption((_) => {
                        _.setName(opt.name);
                        _.setRequired(opt.req || !1);
                        _.setDescription(opt.desc);
                        _.setMinValue(opt.min);
                        _.setMaxValue(opt.max);
                        return _;
                    });
                    break;
                default:
                    opt.description = opt.desc;
                    opt.required = opt.req;
                    slash.options[i] = opt;
                    break;
            }
        });
    }
    return slash;
};
module.exports = {
    msToTime,
    removeItem,
    makeError,
    snowflake: (n = 10) => { var str = ''; for (; n > 0;)
        str = str + (Math.round(random() * 8)), n--; return str; },
    reboot,
    findUser: async (d, target) => {
        target = target.tlc();
        try {
            return (await d.client.users.cache.find((m) => m?.username.toLowerCase() === target || m?.tag.toLowerCase() === target) || await d.client.users.cache.get(target) || await d.msg.mentions.users.first() || (await d.client.users.fetch(target)) || { id: undefined });
        }
        catch {
            return { id: void 0 };
        }
    },
    findMember: (d, target, guild = d.guild) => { target = target.toLowerCase(); return guild.members.cache.find((m) => m.id === target || m.username.toLoweCase() === target || m.username.toLoweCase() + '#' + m.discriminator === target); },
    randomUpperCase,
    firstUpper,
    color,
    makeEmbed,
    makeFields,
    codeblock,
    avatar: (u, opt = { s: 2048, d: !0 }) => u.displayAvatarURL({ size: opt.s, dynamic: opt.d }),
    type,
    subCmdParser,
    wait: (ms) => new Promise((r) => setTimeout(r, ms)),
    getStatus: (url) => axios.get(url).then((r) => r.status).catch((e) => e.response ? e.response.status : e)
};
