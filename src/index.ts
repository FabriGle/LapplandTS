// Imports //
require('colors')
var fs=require('fs'),path=require('path'),{Client,Collection}=require('discord.js'),{Embed}=require('@discordjs/builders'),Config=require('./config.js'),client=new Client(Config.Bot),DATA:any={client:client,embed:Embed},commands:any=[],{REST}=require('@discordjs/rest'),{Routes}=require('discord-api-types/v9')
client.db=require('./database.js')
var rest=new REST({version:'9'}).setToken(process.env.token)
require('./express')()

// Slash Handler //
client.slash=new Collection()
var SlashCommands=fs.readdirSync(path.join(__dirname,'./commands/'))
console.log('|-.-.-.-.-.-.-.-.-.-[Slash]-.-.-.-.-.-.-.-.-.-|')
SlashCommands.forEach((Folder:any)=>{
	var Files = fs.readdirSync(path.join(__dirname,'./commands/',Folder)).filter((file:any)=>file.endsWith('js'))
	for(var File of Files){
		try{
			var Slash = require(`./commands/${Folder}/${File}`)
			client.slash.set(Slash.data.name, Slash)
			console.log('|	Loaded',Slash.data.name.blue)
			commands.push(Slash.data.toJSON())
		} catch (error) {
			console.log(error)
		}
		console.log('|-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-|')
	}
})

// Evenets //
client.on('ready',()=>{
	console.log('Ready on',client.user.tag.blue)
})
client.on('interactionCreate',async(int:any)=>{
	if(!int.isCommand())return
	var cmd=client.slash.get(int.commandName)
	if(!cmd)return
	DATA.int=int

	try{
		await cmd.run(DATA)
	} catch (error) {
		console.error(error)
	}
})

// LogIn //
client.login(process.env.token)
rest.put(Routes.applicationCommands('890016209007960145'),{body:commands})