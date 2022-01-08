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
    name: 'skip',
    desc: 'skip to the next song',
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
        }
        try {
            var song = yield d.queue.skip();
            d.message.reply({
                embeds: [{
                        title: 'Skipped',
                        thumbnail: { url: song.thumbnail },
                        description: `Playing now: \n**[${song.name}](${song.url})**`,
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
