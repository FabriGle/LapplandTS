module.exports={
	name:'play',
	aliases:['p'],
	desc:'Play a song (or playlist)',
	fields:[{name:'song',opt:!1}],
	run:async(d:any)=>{
		var embed:any={}
		if(!d.member.voice.channel){
			embed=d.util.makeError(d,'u must be in a voice channel!','voice')
			return d.msg.reply({embeds:[embed]})
		}
		if(!d.str_args){
			embed=d.util.makeError(d,'field 1 [\'song\'] cannot be empty','field')
			return d.msg.reply({embeds:[embed]})
		}
		d.distube.play(d.member.voice.channel,d.str_args,{
			member:d.member,
			textChannel:d.channel,
			message:d.msg
		})
	}
}