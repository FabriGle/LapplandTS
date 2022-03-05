"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lappy_1 = require("./classes/lappy");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const glob_1 = __importDefault(require("glob"));
var Table = require('ascii-table');
var client = new lappy_1.Lappy({ bot: config_1.bot, music: config_1.music, Emotes: config_1.Emotes });
globalThis._client = client;
require('./helpers/prototypes');
require('./helpers/global');
require('./express')();
var ST = new Table('Slashes')
    .setHeading('Name', 'Category')
    .setJustify();
glob_1.default.sync(path_1.default.join(__dirname, '/slash') + '/**/*.js')
    .forEach(async (PATH) => {
    var Slash = require(PATH);
    Slash.category = PATH.split('/').reverse()[1];
    await client.slash.set(Slash.data.name, Slash);
    client.slashes.push(await Slash.data.toJSON());
});
ST.addRowMatrix(client.slash.map((_) => [_.data.name, _.category]));
console.log(ST.toString());
var CT = new Table('Commands')
    .setHeading('Name', 'Category')
    .setJustify();
glob_1.default.sync(path_1.default.join(__dirname, '/commands') + '/**/*.js')
    .forEach((PATH) => {
    var Cmd = require(PATH);
    Cmd.category = PATH.split('/').reverse()[1];
    client.cmds.set(client.cmds.size + 1, Cmd);
});
CT.addRowMatrix(client.cmds.map((_) => [_.name, _.category]));
console.log(CT.toString());
var _e = fs.readdirSync(path_1.default.join(__dirname, 'events')).filter((file) => file.endsWith('.js'));
for (var _ of _e) {
    try {
        var [e, en] = [require(`./events/${_}`), _.split('.')[0]];
        client.on(en, e.bind(null, client));
    }
    catch (err) {
        console.log(err);
    }
    ;
}
;
var _ed = fs.readdirSync(path_1.default.join(__dirname, 'distube')).filter((file) => file.endsWith('.js'));
for (var _ of _ed) {
    try {
        var [e, en] = [require(`./distube/${_}`), _.split('.')[0]];
        client.distube.on(en, e.bind(null, client));
    }
    catch (err) {
        console.log(err);
    }
    ;
}
;
client.login(process.env.token);
client.REST.put(client.Routes.applicationCommands('890016209007960145'), { body: client.slashes });
