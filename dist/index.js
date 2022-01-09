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
var path = require('path'), { Client, Collection, BitField } = require('discord.js'), Config = require('./config.js'), client = new Client(Config.Bot), slash = [], { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9'), rest = new REST({ version: '9' }).setToken(process.env.token), DisTube = require('distube'), Util = require('./Util'), glob = require('glob'), axios = require('axios'), cld = require('child_process'), exec = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield cld.execSync(data); }), os = require('os'), cpu = os.cpus()[0];
require('./express')();
client.database = require('./database.js');
client.db = {
    set: (type, id, value, ttl = undefined, table = 'main') => {
        client.database.set(table, type + '_' + id, value, ttl);
    },
    get: (type, id, DEFAULT = '', table = 'main') => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return ((_a = (yield client.database.get(table, type + '_' + id))) === null || _a === void 0 ? void 0 : _a.value) || DEFAULT;
    }),
    delete: (type, id, table = 'main') => {
        return client.database.delete(table, type + '_' + id);
    },
    all: (table = 'main') => {
        return client.database.all(table);
    }
};
client.distube = new DisTube.default(client, Config.DisTube);
client.cache = new Collection();
client.slash = new Collection();
console.log('|----------------[Slash]----------------|');
glob.sync(path.join(__dirname, '/slash') + '/**/*.js').forEach((PATH) => {
    var Slash = require(PATH);
    client.slash.set(Slash.data.name, Slash);
    console.log('|	loaded', Util.color.blue(Slash.data.name), `[${Util.color.red(PATH.split('/').reverse()[1])}]`);
    slash.push(Slash.data.toJSON());
});
console.log('|---------------------------------------|');
client.commands = new Collection();
console.log('\n|---------------[Command]---------------|');
glob.sync(path.join(__dirname, '/commands') + '/**/*.js').forEach((PATH) => {
    var Cmd = require(PATH), C = PATH.split('/').reverse()[1];
    Cmd.category = C;
    client.commands.set(Util.random(300), Cmd);
    console.log('|	loaded', Util.color.blue(Cmd.name), `[${Util.color.red(C)}]`);
});
console.log('|---------------------------------------|');
var DATA = {
    client: client,
    emotes: Config.Emotes,
    util: Util,
    BitField: BitField,
    os: os,
    cpu: cpu,
    cdl: cld,
    exec: exec,
    axios: axios
};
client.on('ready', () => {
    console.log(Util.color.red('discord.js'), 'processes started');
});
client.on('interactionCreate', (int) => __awaiter(void 0, void 0, void 0, function* () {
    if (int.isCommand()) {
        var cmd = client.slash.get(int.commandName);
        if (!cmd)
            return;
        DATA.int = int;
        try {
            yield cmd.run(DATA);
        }
        catch (error) {
            console.error(error);
        }
    }
    else if (int.isButton()) {
        var type = int.customId.split('_')[0];
        if (type === 'STACK') {
            if (client.cache.get(int.customId)) {
                return int.reply({ content: `\`\`\`js\n${client.cache.get(int.customId)}\`\`\``, ephemeral: !0 });
            }
            else
                return int.reply({ content: 'Could not interact with the button', ephemeral: !0 });
        }
    }
}));
client.on('messageCreate', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    DATA.guild = msg.guild;
    DATA.channel = msg.channel;
    DATA.msg = msg;
    DATA.member = msg.member;
    DATA.perms = msg.member.permissions.toArray();
    DATA.hasPerms = (perms, member = msg.member) => {
        var mp = member.permissions.toArray();
        perms = perms.replace(' ', '').toUpperCase();
        perms = perms.split(',');
        return mp.some((p) => p === 'ADMINISTRATOR') ? true : perms.every((P) => mp.some((p) => p === P));
    };
    DATA.author = msg.author;
    DATA.distube = client.distube;
    DATA.queue = client.distube.getQueue(msg);
    var t = yield client.db.get('GLOBAL_XP', msg.author.id, { level: 1, current_xp: 0, req_xp: 500 });
    if ((yield client.db.get('GLOBAL_XP_COOLDOWN', msg.author.id, false)))
        return;
    if (t.current_xp <= t.req_xp) {
        t.current_xp = t.current_xp + Util.random(20);
        client.db.set('GLOBAL_XP', msg.author.id, t);
        client.db.set('GLOBAL_XP_COOLDOWN', msg.author.id, true, 5000);
    }
    else {
        t.current_xp = 0;
        t.req_xp = t.req_xp + 500;
        t.level = t.level + 1;
        client.db.set('GLOBAL_XP', msg.author.id, t);
        client.db.set('GLOBAL_XP_COOLDOWN', msg.author.id, true, 5000);
        console.log(`\x1b[31m${msg.author.username} \x1b[0mascended to level\x1b[31m ${t.level}\x1b[0m`);
    }
    client.prefix = yield client.db.get('GUILD_PREFIX', msg.guild.id, '?');
    if (!msg.content.startsWith(client.prefix))
        return;
    var args = msg.content.slice(client.prefix.length).trim().split(/ +/g);
    var Command = args.shift().toLowerCase();
    var Cmd = yield client.commands.find((c) => { var _a; return (c === null || c === void 0 ? void 0 : c.name) === Command || ((_a = c === null || c === void 0 ? void 0 : c.aliases) === null || _a === void 0 ? void 0 : _a.includes(Command)); });
    if (!Cmd)
        return;
    DATA.args = args;
    DATA.last_arg = args[args.length - 1];
    DATA.str_args = args.join(' ');
    DATA.first_arg = args[0];
    DATA.removeArg = (arg) => {
        Util.removeItem(args, arg);
        DATA.last_arg = args[args.length - 1];
        DATA.str_args = args.join(' ');
        DATA.first_arg = args[0];
    };
    DATA.command = Command;
    DATA.cmd = Cmd;
    try {
        yield Cmd.run(DATA);
    }
    catch (error) {
        console.log(`\x1b[31m${error}\x1b[0m`);
    }
}));
process.on('uncaughtException', error => console.log(`\x1b[31m${error}\x1b[0m`));
client.login(process.env.token);
rest.put(Routes.applicationCommands('890016209007960145'), { body: slash });
