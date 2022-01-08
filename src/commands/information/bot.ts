module.exports={
	name:'bot',
	aliases:['bot-information','bot-info','botinfo'],
	desc:'Return my information',
	run:async(d:any)=>{
		var tsv=(await d.exec('tsc -v')).toString(),uptime=d.client.uptime,CT=d.client.user.createdTimestamp,embed:any={}
		embed.title=`${d.emotes.lappy} | Bot Information`
		embed.thumbnail={url:d.author.displayAvatarURL({dynamic:!0,size:4096})}
		embed.color='#001'
		embed.description=`Prefix: \`${await d.client.db.get('GUILD_PREFIX',d.msg.guild.id,'?')}\`
Creation Date: \`${CT}Ms\`  ||<t:${(CT/1000).toFixed(0)}:R>||
Uptime: \`${uptime}Ms\`  ||<t:${((Date.now()-uptime)/1000).toFixed(0)}:R>||
Ping: \`${d.client.ws.ping}Ms\`
Ram Usage: \`${(process.memoryUsage().rss/1024/1024).toFixed(2)} Mega Bytes\`
CPU Usage: \`${d.os.loadavg().map((c:any)=>c+'%').join(' | ')}\`

**Libraries**
\`\`\`md
# TypeScript v${tsv.split(' ')[1]}# Node.js    ${process.version}\n# discord.js v${require('discord.js').version}\`\`\`
**Developers**
Main - <@!788869971073040454>`
		d.msg.reply({embeds:[embed]})
	}
}