var { Routes } = require('discord-api-types/v9');
var { REST } = require('@discordjs/rest');
var _djs = require('discord.js');
var DisTube = require('distube');
export class Lappy extends _djs.Client {
	constructor(options:any){
		super(options.bot);
		this.Config = options;
		this.slashes = new Array();
		this.REST = new REST({version:'9'}).setToken(process.env.token);
		this.Routes = Routes;
		this.database = require('../database');
		this.util = require('../Util');
		this.db={
			set:(type:string,id:string|number,value:any,ttl:any=undefined,table:string='main')=>{
				this.database.set(table,type+'_'+id,value,ttl);
			},
			get:async(type:string,id:string|number,DEFAULT:any='',table:string='main')=>{
				return(await this.database.get(table,type+'_'+id))?.value??DEFAULT;
			},
			delete:async(type:string,id:string|number,table:string='main')=>{
				return await this.database.delete(table,type+'_'+id);
			},
			all:(table:string='main')=>{
				return this.database.all(table);
			}
		};
		this.FunctionManager = require('ifa.js/src/classes/Functions.js').FunctionManager;
		this.distube = new DisTube.default(this,options.music);
		this.cache = new Map();
		this.cmds = new _djs.Collection();
		this.slash = new _djs.Collection();
	};
};