// FirstUpperCase //
var firstUpper=(str:any)=>str.split(' ').map((word:any)=>word.split('').map((char:any,index:number)=>index===0?char.toUpperCase():char).join('')).join(' ')
// FirstUpperCase //

// RandomUpperCase //
var randomUpperCase=(str:any)=>str.split('').map((char:string)=>random(2)==2?char.toLowerCase():char.toUpperCase()).join('')
// RandomUpperCase //

// MiliSecondsToTime //
var pad=(n:any,z:any=2)=>('00'+n).slice(-z)
var msToTime=(ms:number)=>pad(ms/3.6e6|0)+':'+pad((ms%3.6e6)/6e4|0)+':'+pad((ms%6e4)/1000|0)
// MiliSecondsToTime //

// RemoveItem //
var removeItem=(array:any[],item:any)=>{var i=array.indexOf(item);if(i!==-1)return array.splice(i,1)}
// RemoveItem //

// MakeError //
var makeError=(
	d:any,
	description:any|string,
	type:any|string,
	color:string='#001',
	avatar:any=d.author.displayAvatarURL({dynamic:true,size:4096})
)=>{
	if(!d.suppressUpperCase){
		type=type?.fup()
		description=description?.fup()
	}
	return {
		title:`${d.emotes.error} | Error ${type?`>> ${type}`:''}`,
		thumbnail:{
			url:avatar
		},
		description:`\`\`\`\n${description}\n\`\`\``,
		color:color
	}
}
// MakeError //

// MakeEmbed //
var makeEmbed=(
	d:any,
	title:string, 
	desc:string='', 
	fields:any=[], 
	thumb:any=d.author.displayAvatarURL({dynamic:!0,size:4096}), 
	color:string='#001'
)=>{
	return{
		title,
		description:desc, 
		thumbnail:{url:thumb},
		fields,
		color
	}
}
// MakeEmbed //

// MakeFields //
var makeFields=(...fields:any)=>{
	return fields.map((f:any)=>{return{name:f[0],value:f[1],inline:f[2]||!1}})
}
// MakeFields //

// codeblock //
var codeblock=(str:string,n:string='')=>'```'+n+'\n'+str+'```'
// codeblock //

// Reboot //
var reboot=()=>{try{console.log('\n|--------------[Rebooting]--------------|\n');process.on('exit',()=>{require('child_process').spawn(process.argv.shift(),process.argv,{cwd:process.cwd(),detached:!0,stdio:'inherit'})});process.exit();}catch(error){console.log(error)}}
// Reboot //

// Color //
var color={
	black:(str:string)=>`\x1b[0m\x1b[30m${str}\x1b[0m`,
	red:(str:string)=>`\x1b[0m\x1b[31m${str}\x1b[0m`,
	green:(str:string)=>`\x1b[0m\x1b[32m${str}\x1b[0m`,
	yellow:(str:string)=>`\x1b[0m\x1b[33m${str}\x1b[0m`,
	blue:(str:string)=>`\x1b[0m\x1b[34m${str}\x1b[0m`,
	magenta:(str:string)=>`\x1b[0m\x1b[35m${str}\x1b[0m`,
	cyan:(str:string)=>`\x1b[0m\x1b[36m${str}\x1b[0m`,
	white:(str:string)=>`\x1b[0m\x1b[37m${str}\x1b[0m`,
	custom:(str:string,n:number)=>`\x1b[0m\x1b[${n}m${str}\x1b[0m`,
}
// Color //

// Type //
var type=(x:any)=>{
	var t:any=typeof x
	if(t==='object'){
		if(Array.isArray(x)){
			t='array'
		}else if(Buffer.isBuffer(x)){
			t='buffer'
		}else if(x===null){
			t='null'
		}else if(x===undefined){
			t='undefined'
		}else t='object'
	}
	return t
}
// Type //

// subCmdParser //
// @ts-ignore
var { SlashCommandSubcommandBuilder } = require('@discordjs/builders') 
var subCmdParser=(data:any)=>{
	var slash = new SlashCommandSubcommandBuilder()
		.setName(data.name)
		.setDescription(data.desc);
	if(data.opts){
      data.opts.forEach((opt:any,i:number)=>{
        switch(opt.type){
          case'str':
            slash.addStringOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
							return _
            })
            break;
          case'bool':
            slash.addBooleanOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
							return _
            })
            break;
          case'ch':
            slash.addChannelOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
              if(opt.chTypes){
                _.addChannelTypes(opt.chTypes)
              }
							return _
            })
            break;
          case'int':
            slash.addIntegerOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
              _.setMinValue(opt.min)
              _.setMaxValue(opt.max)
							return _
            })
            break;
          case'mention':
            slash.addMentionableOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
							return _
            })
            break;
          case'user':
            slash.addUserOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
							return _
            })
						break;
					case'role':
						slash.addRoleOption((_:any)=>{
							_.setName(opt.name)
							_.setRequired(opt.req||!1)
							_.setDescription(opt.desc)
							return _
						})
						break;
					case'num':
            slash.addNumberOption((_:any)=>{
              _.setName(opt.name)
              _.setRequired(opt.req||!1)
              _.setDescription(opt.desc)
              _.setMinValue(opt.min)
              _.setMaxValue(opt.max)
							return _
            })
            break;
					default:
						opt.description=opt.desc
						opt.required=opt.req
						slash.options[i]=opt
						break;
				}
      })
    }
	return slash
}
// subCmdParser //

module.exports={
	msToTime,
	removeItem,
	makeError,
	snowflake:(n:number=10)=>{var str='';for(;n>0;)str=str+(Math.round(random()*8)),n--;return str},
	reboot,
	findUser:async(d:any,target:any)=>{
		target = target.tlc();
		try{
			return(await d.client.users.cache.find((m:any)=>m?.username.toLowerCase()===target||m?.tag.toLowerCase()===target)||await d.client.users.cache.get(target)||await d.msg.mentions.users.first()||(await d.client.users.fetch(target))||{id:undefined})
		}catch{
			return{id:void 0}
		}
	},
	findMember:(d:any,target:any,guild:any=d.guild)=>{target=target.toLowerCase();return guild.members.cache.find((m:any)=>m.id===target||m.username.toLoweCase()===target||m.username.toLoweCase()+'#'+m.discriminator===target)},
	randomUpperCase,
	firstUpper,
	color, 
	makeEmbed,
	makeFields,
	codeblock,
	avatar:(u:any,opt:any={s:2048,d:!0})=>u.displayAvatarURL({size:opt.s,dynamic:opt.d}),
	type, 
	subCmdParser,
	wait:(ms:number)=>new Promise((r:any)=>setTimeout(r,ms)),
	getStatus:(url:string)=>axios.get(url).then((r:any)=>r.status).catch((e:any)=>e.response?e.response.status:e)
}