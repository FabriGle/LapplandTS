module.exports={
	name:'help',
	desc:'uh~ well... a guide?',
	fields:[{name:'Command',opt:!0}],
	run:async(d:any)=>{
		if(!d.str_args)return d.msg.reply('wait, wait, patience is a virtue')
		var Cmd=await d.client.commands.find((c:any)=>c?.name===d.str_args||c?.aliases?.includes(d.str_args))
		var matchs=await d.client.commands.filter((c:any)=>c?.name.includes(d.str_args)||c?.aliases?.some((k:any)=>k.includes(d.str_args)))
		if(Cmd){
			var [x,...y]:any=Cmd.desc.split('')
			var embed:any={
				title:`${d.emotes.lappy} | Help >> ${Cmd.name}`,
				thumbnail:{url:d.author.displayAvatarURL({dynamic:!0,size:4096})},
				fields:[{name:'Description',value:`\`\`\`\n${x.toUpperCase()+y.join('')}\`\`\``},{name:'Category',value:`\`\`\`\n${Cmd.category}\`\`\``}],
				color:'#001'
			}
			if(Cmd.aliases)embed.fields.push({name:'Aliases',value:`\`\`\`\n${d.util.firstUpper(Cmd.aliases.join(', '))}\`\`\``})
			if(Cmd.fields)embed.fields.push({name:'Fields',value:`\`\`\`\n${Cmd.fields.map((f:any)=>`${d.util.firstUpper(f.name)} | ${f.opt?'Not Required':'Required'}\n`)}\`\`\``})
		}else if(matchs?.length>0||matchs?.length!==undefined){
			var embed:any={
				title:`${d.emotes.lappy} | Help >> Coincidences`,
				thumbnail:{url:d.author.displayAvatarURL({dynamic:!0,size:4096})},
				description:`\`\`\`\n${matchs.map((c:any)=>c.name).join('\n')}\`\`\``,
				color:'#001'
			}
		}else var embed=d.util.makeError(d,'i couldn\'t find that command. are u sure it belongs to me?','not found')

		return d.msg.reply({embeds:[embed]})
	}
}