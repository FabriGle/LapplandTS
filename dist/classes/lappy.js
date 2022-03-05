"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lappy = void 0;
var { Routes } = require('discord-api-types/v9');
var { REST } = require('@discordjs/rest');
var _djs = require('discord.js');
var DisTube = require('distube');
class Lappy extends _djs.Client {
    constructor(options) {
        super(options.bot);
        this.Config = options;
        this.slashes = new Array();
        this.REST = new REST({ version: '9' }).setToken(process.env.token);
        this.Routes = Routes;
        this.database = require('../database');
        this.util = require('../Util');
        this.db = {
            set: (type, id, value, ttl = undefined, table = 'main') => {
                this.database.set(table, type + '_' + id, value, ttl);
            },
            get: async (type, id, DEFAULT = '', table = 'main') => {
                return (await this.database.get(table, type + '_' + id))?.value ?? DEFAULT;
            },
            delete: async (type, id, table = 'main') => {
                return await this.database.delete(table, type + '_' + id);
            },
            all: (table = 'main') => {
                return this.database.all(table);
            }
        };
        this.FunctionManager = require('ifa.js/src/classes/Functions.js').FunctionManager;
        this.distube = new DisTube.default(this, options.music);
        this.cache = new Map();
        this.cmds = new _djs.Collection();
        this.slash = new _djs.Collection();
    }
    ;
}
exports.Lappy = Lappy;
;
