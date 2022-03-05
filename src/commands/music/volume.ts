module.exports={
	name:'volume',
	desc:'change or return volume',
	fields:[{name:'new',opt:!1}],
	run:(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
			return d.msg.reply({embeds:[embed]})
		}

		if(d.args[0]){
			var nv=parseInt(d.args[0])
			if(isNaN(nv)){
				embed=d.util.makeError(d,'field 1 [\'new\'] must be a number','Field >> NaN')
				return d.msg.reply({embeds:[embed]})
			}
			if(nv>200){
				embed=d.util.makeError(d,'field 1 [\'new\'] cannot be greater than 200%')
				return d.msg.reply({embeds:[embed]})
			}
			if(nv<10){
				embed=d.util.makeError(d,'field 1 [\'new\'] cannot be less than 10%')
				return d.msg.reply({embeds:[embed]})
			}

			d.queue.setVolume(nv)
			d.msg.reply(`The volume is now ${nv}%`)
		}else{
			d.msg.reply(`The current volume is ${d.queue.volume}%`)
		}
	}
}