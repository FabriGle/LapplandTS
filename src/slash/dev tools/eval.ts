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
			.setName('noembed')
			.setDescription('If the code will not be returned in embed')
			.setRequired(false))
	,
	run:async(d:any)=>{
		if(d.int.user.id!=='788869971073040454')return d.int.reply({content:'This command is for my developers only',ephemeral:!0})
		var evaled:string='undefined',depth:number=0,embed:any={}

		try{
      evaled=await eval(d.int.options.getString('code'))
    }catch(error){
      var embedError:any=d.util.makeError(d,`Reason: ${error.message}`,error.name,'#001',d.int.user.displayAvatarURL({dynamic:true,size:4096}))
			var row={
				type:1,
				components:[
					{
						label:'View stack',
						type:2,
						style:1,
						customId:'STACK_'+d.util.snowflake(),
						disabled:!1,
						emoji:null
					}
				]
			}
			d.client.cache.set(row.components[0].customId,error.stack)
			return d.int.reply({embeds:[embedError],components:[row]})
    }
		var to=typeof evaled

		if(to=='object')evaled=require('util').inspect(evaled,{depth:depth})
		if(d.int.options.getBoolean('noembed')){
			return d.int.reply({
				content:`${evaled}`==='undefined'?'Assessed correctly':`${evaled}`,
				ephemeral:d.int.options.getBoolean('ephemeral')||false
			})
		}
		embed.title=`${d.emotes.tofu} | Eval`
		embed.thumbnail={url:d.int.user.displayAvatarURL({dynamic:true,size:4096})}
		embed.fields=[
			{
				name:':incoming_envelope: | input',
				value:`\`\`\`ts\n${d.int.options.getString('code')}\n\`\`\``
			},
			{
				name:':page_facing_up: | output',
				value:`\`\`\`ts\n${evaled}\n\`\`\``
			},
			{
				name:':card_box: | typeof',
				value:`\`\`\`ts\n${to}\n\`\`\``
			}
		]
		embed.color='#000001'

		d.int.reply({
			embeds:[embed],
			ephemeral:d.int.options.getBoolean('ephemeral')||false
		})
	}
}