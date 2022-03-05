// Imports //
import { Lappy } from './classes/lappy';
import path from 'path';
import { bot, music, Emotes } from './config';
import glob from 'glob';
var Table = require('ascii-table');
var client:any = new Lappy({bot,music,Emotes});
globalThis._client = client;
require('./helpers/prototypes');
require('./helpers/global')
require('./express')();
// Imports //

// Slash Handler //
var ST = new Table('Slashes')
	.setHeading('Name','Category')
	.setJustify();
glob.sync(path.join(__dirname,'/slash')+'/**/*.js')
	.forEach(async(PATH:any)=>{
		var Slash=require(PATH);
		Slash.category=PATH.split('/').reverse()[1];
		await client.slash.set(Slash.data.name,Slash);
		client.slashes.push(await Slash.data.toJSON());
	});
ST.addRowMatrix(client.slash.map((_:any)=>[_.data.name,_.category]));
console.log(ST.toString());
// Slash Handler //

// Command Handler //
var CT = new Table('Commands')
	.setHeading('Name','Category')
	.setJustify();
glob.sync(path.join(__dirname,'/commands')+'/**/*.js')
	.forEach((PATH:any)=>{
		var Cmd=require(PATH);
		Cmd.category=PATH.split('/').reverse()[1];
		client.cmds.set(client.cmds.size+1,Cmd);
	});
CT.addRowMatrix(client.cmds.map((_:any)=>[_.name,_.category]));
console.log(CT.toString());
// Command Handler //

// Event Handler //
var _e = fs.readdirSync(path.join(__dirname,'events')).filter((file:any)=>file.endsWith('.js'));
for(var _ of _e){
	try{
		var[e,en]=[require(`./events/${_}`),_.split('.')[0]];
		client.on(en,e.bind(null,client));
	}catch(err){
		console.log(err);
	};
};
var _ed = fs.readdirSync(path.join(__dirname,'distube')).filter((file:any)=>file.endsWith('.js'));
for(var _ of _ed){
	try{
		var[e,en]=[require(`./distube/${_}`),_.split('.')[0]];
		client.distube.on(en,e.bind(null,client));
	}catch(err){
		console.log(err);
	};
};
// Event Handler //

// LogIn //
client.login(process.env.token);
client.REST.put(
	client.Routes.applicationCommands('890016209007960145'),
	{ body: client.slashes }
);
// LogIn //