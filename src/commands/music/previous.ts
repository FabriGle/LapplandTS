module.exports={
	name:'previous',
	desc:'play the previous song',
	run:(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}

		try{
			d.queue.previous()
		}catch(error){
			embed=d.util.makeError(d,error.message)
			d.msg.reply({embeds:[embed]})
		}
	}
}