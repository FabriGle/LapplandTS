module.exports={
	name:'avatar',
	aliases:['icon','av'],
	fields:[{name:'target'}],
	desc:'Returns the avatar of a user',
	run:async(d:any)=>{
		if(d.str_args){
			var user:any=await d.util.findUser(d,d.str_args)
		} else var user:any=d.author
		if(!user.id){
			var embedError=d.util.makeError(d,'user [\''+d.str_args+'\'] not found','not found')
			return d.msg.reply({embeds:[embedError]})
		}

		d.embed.title=`${user.username+'#'+user.discriminator} Icon`
		d.embed.image={url:user.displayAvatarURL({dynamic:!0,size:4096})}
		d.embed.color='#001'
		d.msg.reply({embeds:[d.embed]})
	}
}