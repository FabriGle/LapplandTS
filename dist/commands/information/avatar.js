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
    name: 'avatar',
    aliases: ['icon', 'av'],
    fields: [{ name: 'target' }],
    desc: 'Returns the avatar of a user',
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (d.str_args) {
            var user = yield d.util.findUser(d, d.str_args);
        }
        else
            var user = d.author;
        if (!user.id) {
            var embedError = d.util.makeError(d, 'user [\'' + d.str_args + '\'] not found', 'not found');
            return d.msg.reply({ embeds: [embedError] });
        }
        d.embed.title = `${user.username + '#' + user.discriminator} Icon`;
        d.embed.image = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        d.embed.color = '#001';
        d.msg.reply({ embeds: [d.embed] });
    })
};
