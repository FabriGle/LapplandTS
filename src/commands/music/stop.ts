module.exports={
	name:'stop',
	desc:'stop the songs',
	aliases:['disconnect','ds','leave'],
	run:(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}
		
		d.queue.stop()
	}
}