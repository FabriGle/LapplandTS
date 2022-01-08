module.exports={
	name:'queue',
	desc:'Returns the song list',
	aliases:['q'],
	run:async(d:any)=>{
		var embed:any={},rest:number=0,list:any=[],msg:string=''
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}

		d.queue.songs.map((song:any,i:number)=>{
			if(i<=10){list.push(`${i===0?'Playing:':`**${i}.**`} [${song.name}](${song.url}) - **${song.formattedDuration}**`)}else rest=rest++
		})

		if(rest===0){msg=list.join('\n')}else msg=`${list.join('\n')}\n**and ${rest} more ${rest>1?'songs':'song'}**`

		try{
			return d.msg.reply({
				embeds:[{
					title:`${d.emotes.lappy} | queue`,
					thumbnail:{url:d.author.displayAvatarURL({dynamic:!0,size:4096})},
					description:msg,
					footer:{text:'Total duration:'+d.util.msToTime(eval(d.queue.songs.map((s:any)=>s.duration).join('+'))*1000)},
					color:'#001'
				}]
			})
		}catch(error){
			embed=d.util.makeError(d,error.message)
			return d.msg.reply({embeds:[embed]})
		}
	}
}