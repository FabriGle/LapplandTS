// Random //
var random=(max:number,min:number=1,decimals:boolean=false)=>decimals?Math.random()*(max-min)+min:Math.round(Math.random()*(max-min))+min
// Random //

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
	description:string,
	type:string,
	color:string='#001',
	avatar:any=d.author.displayAvatarURL({dynamic:true,size:4096})
)=>{
	if(!d.suppressUpperCase){
		type=firstUpper(type)
		description=firstUpper(description)
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

module.exports={
	random,
	msToTime,
	removeItem,
	makeError,
	snowflake:(n:number=10)=>{var str='';for(;n>0;)str=str+(Math.round(Math.random()*8)),n--;return str},
	reboot,
	findUser:async(d:any,target:any)=>{target=target.toLowerCase();try{return(await d.client.users.cache.find((m:any)=>m?.username.toLowerCase()===target||m?.tag.toLowerCase()===target)||await d.client.users.cache.get(target)||await d.msg.mentions.users.first()||(await d.client.users.fetch(target))||{id:undefined})}catch{return{id:undefined}}},
	findMember:(d:any,target:any,guild:any=d.guild)=>{target=target.toLowerCase();return guild.members.cache.find((m:any)=>m.id===target||m.username.toLoweCase()===target||m.username.toLoweCase()+'#'+m.discriminator===target)},
	randomUpperCase:randomUpperCase,
	firstUpper,
	color
}