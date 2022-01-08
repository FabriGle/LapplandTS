"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    name: 'search',
    desc: 'search songs',
    fields: [{ name: 'query', opt: !1 }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (!d.str_args) {
            var embedError = d.util.makeError(d, 'field 1 [\'query\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [embedError] });
        }
        var songs = yield d.distube.search(d.str_args);
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
    })
};
