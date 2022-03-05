"use strict";
module.exports = {
    name: 'avatar',
    aliases: ['icon', 'av'],
    fields: [{ name: 'target' }],
    desc: 'Returns the avatar of a user',
    run: async (d) => {
        if (d.str_args) {
            var user = await d.util.findUser(d, d.str_args);
        }
        else
            var user = d.author;
        if (!user.id) {
            var embedError = d.util.makeError(d, 'user [\'' + d.str_args + '\'] not found', 'not found');
            return d.msg.reply({ embeds: [embedError] });
        }
        var embed = d.util.makeEmbed(d, `${user.username + '#' + user.discriminator} Icon`);
        embed.image = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        d.msg.reply({ embeds: [embed] });
    }
};
