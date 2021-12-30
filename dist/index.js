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
require('colors');
var fs = require('fs'), path = require('path'), { Client, Collection } = require('discord.js'), { Embed } = require('@discordjs/builders'), Config = require('./config.js'), client = new Client(Config.Bot), DATA = { client: client, embed: Embed }, commands = [], { REST } = require('@discordjs/rest'), { Routes } = require('discord-api-types/v9');
client.db = require('./database.js');
var rest = new REST({ version: '9' }).setToken(process.env.token);
require('./express')();
client.slash = new Collection();
var SlashCommands = fs.readdirSync(path.join(__dirname, './commands/'));
console.log('|-.-.-.-.-.-.-.-.-.-[Slash]-.-.-.-.-.-.-.-.-.-|');
SlashCommands.forEach((Folder) => {
    var Files = fs.readdirSync(path.join(__dirname, './commands/', Folder)).filter((file) => file.endsWith('js'));
    for (var File of Files) {
        try {
            var Slash = require(`./commands/${Folder}/${File}`);
            client.slash.set(Slash.data.name, Slash);
            console.log('|	Loaded', Slash.data.name.blue);
            commands.push(Slash.data.toJSON());
        }
        catch (error) {
            console.log(error);
        }
        console.log('|-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-|');
    }
});
client.on('ready', () => {
    console.log('Ready on', client.user.tag.blue);
});
client.on('interactionCreate', (int) => __awaiter(void 0, void 0, void 0, function* () {
    if (!int.isCommand())
        return;
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
}));
client.login(process.env.token);
rest.put(Routes.applicationCommands('890016209007960145'), { body: commands });
