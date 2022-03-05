import axios from 'axios';
import cld from 'child_process';
import os from 'os';
var cpu = os.cpus()[0];
async function exec(c:string){
	return(await cld.execSync(c)).toString();
}
module.exports=async(_:any,msg:any)=>{
	if(msg.author.bot||!msg.channel||!msg.guild)return;
	var{
		guild,
		channel,
		member,
		author
	}=msg;

	// Level System //
	var T = await _.db.get(
		'GLOBAL_XP', 
		author.id,
		{level:1,current_xp:0,req_xp:500}
	);
	if(!(await _.db.get('GLOBAL_XP_COOLDOWN',author.id,!1))){
		if(T.current_xp<=T.req_xp){
			T.current_xp=T.current_xp+random(20);
			await _.db.set('GLOBAL_XP',author.id,T);
			await _.db.set('GLOBAL_XP_COOLDOWN',author.id,!0,5000);
		}else{
			T.current_xp=0;
			T.req_xp=T.req_xp+500;
			T.level++;
			await _.db.set('GLOBAL_XP',author.id,T)
			await _.db.set('GLOBAL_XP_COOLDOWN',author.id,!0,5000);
			console.log(`\x1b[31m${author.username} \x1b[0mascended to level\x1b[31m ${T.level}\x1b[0m`)
		}
	}
	// Level System //

	// Commands //
	_.prefix=await _.db.get('GUILD_PREFIX',guild.id,'?');
	if(!msg.content.startsWith(_.prefix))return;
	var[Command,...args]=msg.content
		.slice(_.prefix.length)
		.trim()
		.split(/ +/g);
	Command=Command.tlc();
	var last_arg=args[args.length-1];
	var str_args=args.join(' ');
	var first_arg=args[0];
	var Cmd=await _.cmds
		.find((c:any)=>c?.name===Command||c?.aliases?.includes(Command));
	if(!Cmd)return;


	try{
		// console.log(`${_.util.color.blue(Command)} for ${_.util.color.red(msg.author.username)}`)
		return await Cmd.run({
			msg,
			channel,
			guild, 
			author,
			member,
			perms:member.permissions.toArray(), 
			hasPerms:(perms:any,member:any=msg.member)=>{
				var mp:any=member.permissions.toArray()
				perms=perms
					.replace(' ','')
					.tuc()
					.split(',');
				return mp.some((p:string)=>p==='ADMINISTRATOR')?true:perms.every((P:any)=>mp.some((p:string)=>p===P))
			},
			distube:_.distube,
			queue:_.distube.getQueue(msg), 
			args, 
			last_arg,
			str_args, 
			first_arg,
			removeArg:(arg:any)=>{
				args.delete(arg);
				last_arg=args[args.length-1];
				str_args=args.join(' ');
				first_arg=args[0];
			}, 
			Command, 
			Cmd, 
			client:_,
			emotes:_.Config.Emotes,
			util:_.util,
			os,
			cpu,
			cld,
			exec,
			axios
		})
	}catch(e){
		var embedError=_.util.makeError({author,emotes:_.Config.Emotes},`Reason: ${e.message}`,e.name)
		var row={
			type:1,
			components:[{
				label:'View stack',
				type:2,
				style:4,
				customId:'STACK_'+_.util.snowflake(),
				disabled:!1,
				emoji:null
			}]
		};
		_.cache.set(row.components[0].customId,e.stack);
		console.log(`\x1b[31m${e}\x1b[0m`);
		return msg.reply({embeds:[embedError],components:[row]});
	}
	// Commands //
};