module.exports={
	name:'shuffle',
	desc:'shuffle the song list',
	run:(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}

		d.queue.shuffle(d.msg)
		return d.msg.reply('the queue was shuffled')
	}
}