"use strict";
module.exports = {
    name: 'search',
    desc: 'search songs',
    fields: [{ name: 'query', opt: !1 }],
    run: async (d) => {
        if (!d.str_args) {
            var embedError = d.util.makeError(d, 'field 1 [\'query\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [embedError] });
        }
        var songs = await d.distube.search(d.str_args);
        if (!songs) {
            var embedError = d.util.makeError(d, 'song [\'' + d.str_args + '\'] not found', 'not found');
            return d.msg.reply({ embeds: [embedError] });
        }
        return d.msg.reply({
            embeds: [{
                    title: `${d.emotes.lappy} | Search`,
                    thumbnail: { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) },
                    description: songs.map((r) => `[${r.name}](${r.url})`).join('\n'),
                    color: '#001'
                }]
        });
    }
};
