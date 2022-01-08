var{SlashCommandBuilder}=require('@discordjs/builders')
module.exports={
	data:new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Returns the avatar of a user')
		.addUserOption((option:any)=>
			option
				.setRequired(false)
				.setName('target')
				.setDescription('The user whose avatar you want to see'))
	,
	run:(d:any)=>{
		var user:any=d.int.options.getUser('target'),embed:any={},a:any=''
		if(!user)user=d.int.user
		var member=d.int.guild.members.cache.find((x:any)=>x.id===user.id)

		embed.title=`${user.username+'#'+user.discriminator} Icon`
		embed.image={url:user.displayAvatarURL({dynamic:!0,size:4096})}
		embed.color='#001'
		d.int.reply({embeds:[embed]})
	}
}