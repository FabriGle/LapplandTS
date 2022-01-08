module.exports={
	name:'resume',
	desc:'resume songs',
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
			d.queue.resume()
			return d.mdg.reply('queue resumed')
		}catch{
			embed=d.util.makeError(d,'Can\'t pause the queue','queue')
			return d.msg.reply({embeds:[embed]})
		}
	}
}