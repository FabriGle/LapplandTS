module.exports={
	name:'eval',
	desc:'Evaluate javascript code',
	options:[{name:'noembed',desc:'Makes the return not embed'}],
	fields:[{name:'code',opt:!1}],
	run:async(d:any)=>{
	  if(!['735170692915396698','788869971073040454'].includes(d.author.id))return d.msg.reply('This command is for my developers only') 
		d.suppressUpperCase=!0
		var Start:number=Date.now(),axios:any=require('axios'),dsc:any=require('discord.js'),http:any=require('http'),https:any=require('https'),fs:any=require('fs'),path:any=require('path'),cld:any=require('child_process'),exec:any=async(data:string)=>await cld.execSync(data),os:any=require('os'),cpu:any=os.cpus()[0],x:any=null,y:any=null,z:any=null,str:string|String=new String(),arr:any[]=new Array(),obj:object|any=new Object(),num:number|Number=new Number()

		var evaled:any='undefined',depth:number=0,embed:any={},ne:boolean=d.args.includes('--noembed')

		try{
      ne?(d.removeArg('--noembed'),evaled=eval(`(async()=>${d.str_args})()`)):evaled=await eval(`(async()=>${d.str_args})()`)
    } catch (error){
			var embedError:any=d.util.makeError(d,`Reason: ${error.message}`,error.name)
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
			return d.msg.reply({embeds:[embedError],components:[row]})
    }
		var to=typeof evaled

		if(to=='object')evaled=require('util').inspect(evaled,{depth:depth})
		if(ne){
			return d.msg.reply({
				content:`${evaled}`==='undefined'?'Assessed correctly':`${evaled}`
			})
		}
		embed.title=`${d.emotes.tofu} | Eval`
		embed.thumbnail={url:d.author.displayAvatarURL({dynamic:!0,size:4096})}
		embed.fields=[
			{
				name:':incoming_envelope: | input',
				value:`\`\`\`ts\n${d.str_args}\n\`\`\``
			},
			{
				name:':page_facing_up: | output',
				value:`\`\`\`ts\n${evaled}\n\`\`\``
			},
			{
				name:':card_box: | typeof',
				value:`\`\`\`ts\n${to}\n\`\`\``
			},
			{
				name:':stopwatch: | execution time',
				value:`\`\`\`ts\n${Date.now()-Start}Ms\n\`\`\``
			}
		]
		embed.color='#001'

		d.msg.reply({
			embeds:[embed]
		})
	}
}