module.exports={
	name:'aoi',
	aliases:['aoijs','aoi.js'],
	desc:'returns information from aoi.js functions',
	fields:[{name:'function',opt:!1}],
	options:[{name:'list',desc:'returns a list of matches'}],
	run:async(d:any)=>{
		if(!d.str_args){
			var embedError=d.util.makeError(d,'field 1 [\'function\'] cannot be empty','field')
			return d.msg.reply({embeds:[embedError]})
		}
		if(d.str_args.includes('--list')){
			await d.removeArg('--list')
			var Funcs=(await d.axios.default.request({url:'https://api.leref.ga/functions/'+d.args[0],method:'GET'})).data.data.filter((F:any)=>F.name.includes(d.args[0])),arr:any=[],n:any=(d.args[1]||1)-1,total:number=Funcs.length

			Funcs.map((f:any,i:any)=>{
				if(i>10)return
				arr.push(`[${f.name}](https://aoi.js.org/docs#/function/${f.name})`)
			})

			return d.msg.reply({embeds:[{
				author:{name:`Coincidences: ${total}`},
				title:d.emotes.lappy+' | List',
				description:arr.join('\n'),
				footer:{text:'Functions provided by official aoi.js API'},
				color:'#6F96DE'
			}]})
		}else{
			var Funcs:any=null,n:any=(d.args[1]||1)-1
			d.axios.default.request({url:'https://api.leref.ga/functions/'+d.args[0],method:'GET'}).then((req:any)=>{
				Funcs=req.data.data
				if(Funcs.length==0){
					var embedError=d.util.makeError(d,`The function ['${d.args[0]}'] could not be found`,'not found')
					return d.msg.reply({embeds:[embedError]})
				}
				var Func=Funcs[n]
					return d.msg.reply({embeds:[{
					author:{name:`Coincidences: ${Funcs.length}`},
					title:Func.name,
					url:'https://aoi.js.org/docs#/function/'+Func.name,
					description:`${Func.desc}
	\`\`\`js\n${Func.usage}\`\`\``,
					footer:{text:'Function data provided by official aoi.js API'},
					color:'#6F96DE'
				}]})
			}).catch((e:any)=>{
				var embedError=d.util.makeError(d,`The function ['${d.args[0]}'] could not be found`,'not found')
					return d.msg.reply({embeds:[embedError]})
			})
		}
	}
}