module.exports={
	name:'set-prefix',
	aliases:['setprefix','prefix'],
	run:async(d:any)=>{
		if(d.str_args){
			if(!d.hasPerms('manage_guild')){
				var embedError=d.util.makeError(d,'You do not have permission to do this\n\nRequired: \'Manage Guild\'','Permissions')
				return d.msg.reply({embeds:[embedError]})
			}
			await d.client.db.set('GUILD_PREFIX',d.guild.id,d.first_arg)
			d.msg.reply(`\`Prefix changed to ${d.first_arg}\``)
		}else d.msg.reply(`\`my prefix on this server is '${d.client.prefix}'\``)
	}
}