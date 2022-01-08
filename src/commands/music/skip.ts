module.exports={
	name:'skip',
	desc:'skip to the next song',
	run:async(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}

		try{
			var song=await d.queue.skip()
			d.message.reply({
				embeds:[{
					title: 'Skipped',
					thumbnail:{url:song.thumbnail},
					description:`Playing now: \n**[${song.name}](${song.url})**`,
					color:'#001'
				}]
			})
		}catch(error){
			embed=d.util.makeError(d,error.message)
			return d.msg.reply({embeds:[embed]})
		}
	}
}