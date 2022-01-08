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
    name: 'queue',
    desc: 'Returns the song list',
    aliases: ['q'],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var embed = {}, rest = 0, list = [], msg = '';
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
        }
        d.queue.songs.map((song, i) => {
            if (i <= 10) {
                list.push(`${i === 0 ? 'Playing:' : `**${i}.**`} [${song.name}](${song.url}) - **${song.formattedDuration}**`);
            }
            else
                rest = rest++;
        });
        if (rest === 0) {
            msg = list.join('\n');
        }
        else
            msg = `${list.join('\n')}\n**and ${rest} more ${rest > 1 ? 'songs' : 'song'}**`;
        try {
            return d.msg.reply({
                embeds: [{
                        title: `${d.emotes.lappy} | queue`,
                        thumbnail: { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) },
                        description: msg,
                        footer: { text: 'Total duration:' + d.util.msToTime(eval(d.queue.songs.map((s) => s.duration).join('+')) * 1000) },
                        color: '#001'
                    }]
            });
        }
        catch (error) {
            embed = d.util.makeError(d, error.message);
            return d.msg.reply({ embeds: [embed] });
        }
    })
};
