module.exports={
	name:'bot',
	aliases:['bot-information','bot-info','botinfo'],
	desc:'Return my information',
	run:async(d:any)=>{
		var tsv=(await d.exec('tsc -v')).toString(),uptime=d.client.uptime,CT=d.client.user.createdTimestamp,embed:any={},fields=d.util.makeFields(['Prefix',`\`${await d.client.db.get('GUILD_PREFIX',d.msg.guild.id,'?')}\``],['Creation Date',`\`${CT}Ms\`\n||<t:${(CT/1000).toFixed(0)}:R>||`],['UpTime',`\`${uptime}Ms\`\n||<t:${((Date.now()-uptime)/1000).toFixed(0)}:R>||`],['Ping',`\`${d.client.ws.ping}Ms\``],['Ram Usage',`\`${(process.memoryUsage().rss/1024/1024).toFixed(2)} Mega Bytes\``],['CPU Usage',`\`${d.os.loadavg().map((c:any)=>c+'%').join(' | ')}\``],['Libraries',d.util.codeblock(`# TypeScript v${tsv.split(' ')[1]}# discord.js v${require('discord.js').version}\n# Node.js    ${process.version}`,'md')],['Developers','Main - <@!788869971073040454>'])
		embed=d.util.makeEmbed(d,`${d.emotes.lappy} | Bot Information`,null,fields)
		d.msg.reply({embeds:[embed]})
	}
}