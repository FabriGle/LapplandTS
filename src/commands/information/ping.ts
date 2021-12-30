var{SlashCommandBuilder}=require('@discordjs/builders')
module.exports={
	data:new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns the ping of the bot')
	,
	run:(d:any)=>{
		d.int.reply(d.client.ws.ping.toString())
	}
}