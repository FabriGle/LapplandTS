module.exports={
	name:'user',
	aliases:['user-information','user-info','userinfo'],
	desc:'Returns the information of a user',
	fields:[{name:'target',opt:!0}],
	run:async(d:any)=>{
		var embed:any={},a:any=''
		if(d.str_args){
			var user:any=await d.util.findUser(d,d.str_args)
		} else var user:any=d.author
		if(!user.id){
			var embedError=d.util.makeError(d,'user [\''+d.str_args+'\'] not found','not found')
			return d.msg.reply({embeds:[embedError]})
		}
		var member=d.guild.members.cache.find((x:any)=>x.id===user.id)
		if(member){
			a=`**Joined:** <t:${Math.floor(member.joinedTimestamp/1000)}:R>`
		}

		embed.title=`${user.username+'#'+user.discriminator} Information`
		embed.description=`**Nick:** \`${member?.nickname||user.username}\`
**Id:** \`${user.id}\`
**Is Bot?:** ${user.bot?'Yes':'No'}${a?'\n'+a:''}

[avatar](${user.displayAvatarURL({dynamic:!0,size:4096})})`
		embed.thumbnail={url:user.displayAvatarURL({dynamic:!0,size:4096})}
		embed.color='#001'
		d.msg.reply({embeds:[embed]})
	}
}