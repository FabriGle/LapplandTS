"use strict";
module.exports = {
    name: 'level',
    desc: 'Returns the level of a user',
    aliases: ['lvl', 'lv'],
    fields: [{ name: 'target', opt: !0 }],
    run: async (d) => {
        var user = d.str_args ? (await d.util.findUser(d, d.str_args)) : d.author, t = await d.client.db.get('GLOBAL_XP', user.id, { level: 1, current_xp: 0, req_xp: 500 });
        return d.msg.reply({ embeds: [d.util.makeEmbed(d, `${user.username + '#' + user.discriminator} Rank Card`, `**Level:** \`${t.level}\`\n**XP:** ${t.current_xp}/${t.req_xp}`, null, d.util.avatar(user))] });
    }
};
