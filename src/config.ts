var{Intents}=require('discord.js')
module.exports={
	Bot:{
		allowedMentions: {
			repliedUser: false
		},
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES
		]
	}
}