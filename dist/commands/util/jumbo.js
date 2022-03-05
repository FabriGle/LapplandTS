"use strict";
module.exports = {
    name: 'jumbo',
    aliases: ['emoji', 'emote'],
    desc: 'No description',
    fields: [{ name: 'emote', opt: !1 }],
    run: (d) => {
        if (!d.str_args) {
            var _err = util.makeError(d, 'field 1 [\'emote\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [_err] });
        }
        ;
        var _e = _client.emojis.cache
            .find((_) => _.name.tlc() === d.str_args.split(/:/g)[1]?.tlc() || _.id === d.str_args || _.name.tlc() === d.str_args.tlc());
        if (!_e) {
            var _err = util.makeError(d, `The emote [${d.str_args}] could not be found`, 'Not Found');
            return d.msg.reply({ embeds: [_err] });
        }
        ;
        return d.msg.reply({ embeds: [{
                    title: _e.name,
                    image: { url: _e.url },
                    url: _e.url + '?size=1024',
                    footer: { text: 'id: ' + _e.id },
                    color: '#001',
                    thumbnail: { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) }
                }] });
    }
};
