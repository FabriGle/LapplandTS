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
    name: 'play',
    aliases: ['p'],
    desc: 'Play a song (or playlist)',
    fields: [{ name: 'song', opt: !1 }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.str_args) {
            embed = d.util.makeError(d, 'field 1 [\'song\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [embed] });
        }
        d.distube.play(d.msg, d.str_args);
    })
};
