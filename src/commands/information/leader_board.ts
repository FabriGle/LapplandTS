module.exports = {
	name: 'leaderboard',
	aliases: ['lb'],
	desc: 'Returns a leader board',
	run: async (d:any) => {
		var all = (await d.client.db.all())
			.filter((v:any)=>v.key.startsWith('GLOBAL_XP_'))
			.sort((x:any,y:any)=>x.data.value.level-y.data.value.level);
		let arr:any[] = new Array(),i:number = 0;
		for(var _ of all){
			console.log(_);
			i++;
			var u = await util.findUser(d,_.key.split('_')[2]);
			var m = `**${i}.** \`${
				u.username+'#'+u.discriminator
			}\`: LvL${
				_.data.value.level
			} - ${
				_.data.value.current_xp
			}/${
				_.data.value.req_xp
			}`;
			arr.push(msg);
		};
		return d.msg.reply({embeds:[d.util.makeEmbed(d,d.emotes.feli+' | Global leader board',arr.join('\n'))]})
	}
};