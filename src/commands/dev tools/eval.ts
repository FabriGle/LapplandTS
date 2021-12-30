var{SlashCommandBuilder}=require('@discordjs/builders')
module.exports={
	data:new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Evaluate a code')
		.addStringOption((option:any)=>
			option
				.setName('code')
				.setDescription('The code to be evaluated')
				.setRequired(true))
		.addBooleanOption((option:any)=>
			option
			.setName('ephemeral')
			.setDescription('Return in ephemeral?')
			.setRequired(false))
		.addBooleanOption((option:any)=>
			option
			.setName('codeblock')
			.setDescription('If the return will be in codeblock or not')
			.setRequired(false))
	,
	run:async(d:any)=>{
		if(d.int.user.id!=='788869971073040454')return d.int.replt({content:'This command is for my developers only'})
		var evaled='undefined',depth=0

		try{
      evaled=await eval(d.int.options.getString('code'))
    } catch (error){
      return d.int.reply({
        embeds: [
          {
            title: 'Error',
						thumbnail:{url:d.int.user.displayAvatarURL({dynamic:true,size:4096})},
            description: `\`\`\`bash\n${error.stack}\n\`\`\``,
            color: '#CC0000'
          }
        ]
      })
    }

		if(typeof evaled=='object')evaled=require('util').inspect(evaled,{depth:depth})
		if(d.int.options.getBoolean('codeblock')){
			evaled=`\`\`\`ts\n${evaled}\`\`\``
		}

		d.int.reply({
			content:evaled||'Assessed correctly',
			ephemeral:d.int.options.getBoolean('ephemeral')||false
		})
	}
}