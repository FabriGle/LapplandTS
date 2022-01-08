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
    name: 'now-playing',
    desc: 'returns the song that is playing',
    aliases: ['nowplaying', 'np'],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
        }
        var song = d.queue.songs[0];
        return d.msg.reply({
            embeds: [
                {
                    title: song.name,
                    thumbnail: { url: song.thumbnail },
                    description: `**Uploader:** [${song.uploader.name}](${song.uploader.url})
**Duration:** ${song.formattedDuration}
**Views:** ${song.views}
**Added by:** <@!${song.user.id}>
**Source:** ${song.source}
**Age Restricted:** ${song.age_restricted}
**Likes${(song === null || song === void 0 ? void 0 : song.dislikes) ? ' and dislikes' : ''}:** ${song.likes}${(song === null || song === void 0 ? void 0 : song.dislikes) ? ` | ${song.dislikes}` : ''}`,
                    color: '#001'
                }
            ]
        });
    })
};
