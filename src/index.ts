// Imports //
var path=require('path'),{Client,Collection,BitField}=require('discord.js'),Config=require('./config.js'),client=new Client(Config.Bot),slash:any=[],{REST}=require('@discordjs/rest'),{Routes}=require('discord-api-types/v9'),rest=new REST({version:'9'}).setToken(process.env.token),DisTube=require('distube'),Util=require('./Util'),glob=require('glob'),axios:any=require('axios'),cld:any=require('child_process'),exec:any=async(data:string)=>await cld.execSync(data),os:any=require('os'),cpu:any=os.cpus()[0]
require('./express')()
// Imports //

// DataBase //
client.database=require('./database.js')
client.db={
	set:(type:string,id:string,value:any,ttl:any=undefined,table:string='main')=>{
		client.database.set(table,type+'_'+id,value,ttl)
	},
	get:async(type:string,id:string,DEFAULT:any='',table:string='main')=>{
		return (await client.database.get(table,type+'_'+id))?.value||DEFAULT
	},
	delete:(type:string,id:string,table:string='main')=>{
		return client.database.delete(table,type+'_'+id)
	},
	all:(table:string='main')=>{
		return client.database.all(table)
	}
}
// DataBase //

client.distube=new DisTube.default(client,Config.DisTube)
client.cache=new Collection()

// Slash Handler //
client.slash=new Collection()
console.log('|----------------[Slash]----------------|')
glob.sync(path.join(__dirname,'/slash')+'/**/*.js').forEach((PATH:any)=>{
	var Slash=require(PATH);client.slash.set(Slash.data.name,Slash);
	console.log('|	loaded',Util.color.blue(Slash.data.name),`[${Util.color.red(PATH.split('/').reverse()[1])}]`)
	slash.push(Slash.data.toJSON())
})
console.log('|---------------------------------------|')
// Slash Handler //

// Command Handler //
client.commands=new Collection()
console.log('\n|---------------[Command]---------------|')
glob.sync(path.join(__dirname,'/commands')+'/**/*.js').forEach((PATH:any)=>{
	var Cmd=require(PATH),C=PATH.split('/').reverse()[1];Cmd.category=C;client.commands.set(Util.random(300),Cmd)
	console.log('|	loaded',Util.color.blue(Cmd.name),`[${Util.color.red(C)}]`)
})
console.log('|---------------------------------------|')
// Command Handler //

// DATA //
var DATA:any={
	client:client,
	emotes:Config.Emotes,
	util:Util,
	BitField:BitField,
	os:os,
	cpu:cpu,
	cdl:cld,
	exec:exec,
	axios:axios
}
// DATA //

// Evenets //
client.on('ready',()=>{
	console.log(Util.color.red('discord.js'),'processes started')
})
client.on('interactionCreate',async(int:any)=>{
	if(int.isCommand()){
		var cmd=client.slash.get(int.commandName)
		if(!cmd)return
		DATA.int=int

		try{
			await cmd.run(DATA)
		} catch (error) {
			console.error(error)
		}
	} else if(int.isButton()){
		var type=int.customId.split('_')[0]
		if(type==='STACK'){
			if(client.cache.get(int.customId)){
				return int.reply({content:`\`\`\`js\n${client.cache.get(int.customId)}\`\`\``,ephemeral:!0})
			}else return int.reply({content:'Could not interact with the button',ephemeral:!0})
		}
	}
})
client.on('messageCreate',async(msg:any)=>{
	if(msg.author.bot)return
	// DATA //
	DATA.guild=msg.guild
	DATA.channel=msg.channel
	DATA.msg=msg
	DATA.member=msg.member
	DATA.perms=msg.member.permissions.toArray()
	DATA.hasPerms=(perms:any,member:any=msg.member)=>{
		var mp:any=member.permissions.toArray()
		perms=perms.replace(' ','').toUpperCase()
		perms=perms.split(',')
		return mp.some((p:string)=>p==='ADMINISTRATOR')?true:perms.every((P:any)=>mp.some((p:string)=>p===P))
	}
	DATA.author=msg.author
	DATA.distube=client.distube
	DATA.queue=client.distube.getQueue(msg)
	// DATA //

	// Level System //
	var t=await client.db.get('GLOBAL_XP',msg.author.id,{level:1,current_xp:0,req_xp:500})
	if((await client.db.get('GLOBAL_XP_COOLDOWN',msg.author.id,false)))return
	if(t.current_xp<=t.req_xp){
		t.current_xp=t.current_xp+Util.random(20)
		client.db.set('GLOBAL_XP',msg.author.id,t)
		client.db.set('GLOBAL_XP_COOLDOWN',msg.author.id,true,5000)
	} else {
		t.current_xp=0
		t.req_xp=t.req_xp+500
		t.level=t.level+1
		client.db.set('GLOBAL_XP',msg.author.id,t)
		client.db.set('GLOBAL_XP_COOLDOWN',msg.author.id,true,5000)
		console.log(`\x1b[31m${msg.author.username} \x1b[0mascended to level\x1b[31m ${t.level}\x1b[0m`)
	}
	// Level System //

	// Commands //
	client.prefix=await client.db.get('GUILD_PREFIX',msg.guild.id,'?')
	if(!msg.content.startsWith(client.prefix))return
	var args=msg.content.slice(client.prefix.length).trim().split(/ +/g)
	var Command=args.shift().toLowerCase()
	var Cmd=await client.commands.find((c:any)=>c?.name===Command||c?.aliases?.includes(Command))
	if(!Cmd)return
		// More DATA //
		DATA.args=args
		DATA.last_arg=args[args.length-1]
		DATA.str_args=args.join(' ')
		DATA.first_arg=args[0]
		DATA.removeArg=(arg:any)=>{
			Util.removeItem(args,arg)
			DATA.last_arg=args[args.length-1]
			DATA.str_args=args.join(' ')
			DATA.first_arg=args[0]
		}

		DATA.command=Command
		DATA.cmd=Cmd
		// More DATA //

	try{
		await Cmd.run(DATA)
	}catch(error){
		console.log(`\x1b[31m${error}\x1b[0m`)
	}
	// Commands //
})
process.on('uncaughtException',error=>console.log(`\x1b[31m${error}\x1b[0m`))
// Evenets //

// LogIn //
client.login(process.env.token)
rest.put(Routes.applicationCommands('890016209007960145'),{body:slash})
// LogIn //