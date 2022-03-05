"use strict";
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    desc: 'Returns a leader board',
    run: async (d) => {
        var all = (await d.client.db.all()).filter((v) => v.key.startsWith('GLOBAL_XP_')).sort((x, y) => x.data.value.level - y.data.value.level), arr = '';
        all = all.slice(all.length - 10).reverse();
        all.forEach(async (k, i) => {
            var u = await d.util.findUser(d, k.key.split('_')[2]), msg = `**${i + 1}.** \`${u.username + '#' + u.discriminator}\`: LvL${k.data.value.level} - ${k.data.value.current_xp}/${k.data.value.req_xp}`;
            console.log(msg);
            arr += msg;
        });
        return d.msg.reply({ embeds: [d.util.makeEmbed(d, d.emotes.feli + ' | Global leader board', arr)] });
    }
};
