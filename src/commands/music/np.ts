module.exports={
	name:'now-playing',
	desc:'returns the song that is playing',
	aliases:['nowplaying','np'],
	run:async(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.queue){
			embed=d.util.makeError(d,'There is nothing playing!','queue')
		}
		var song=d.queue.songs[0]

		return d.msg.reply({
			embeds: [
				{
					title:song.name,
					thumbnail:{ url: song.thumbnail },
					description:`**Uploader:** [${song.uploader.name}](${song.uploader.url})
**Duration:** ${song.formattedDuration}
**Views:** ${song.views}
**Added by:** <@!${song.user.id}>
**Source:** ${song.source}
**Age Restricted:** ${song.age_restricted}
**Likes${song?.dislikes?' and dislikes':''}:** ${song.likes}${song?.dislikes?` | ${song.dislikes}`:''}`,
					color: '#001'
				}
			]
		})
	}
}