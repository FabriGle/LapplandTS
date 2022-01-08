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
    name: 'user',
    aliases: ['user-information', 'user-info', 'userinfo'],
    desc: 'Returns the information of a user',
    fields: [{ name: 'target', opt: !0 }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var embed = {}, a = '';
        if (d.str_args) {
            var user = yield d.util.findUser(d, d.str_args);
        }
        else
            var user = d.author;
        if (!user.id) {
            var embedError = d.util.makeError(d, 'user [\'' + d.str_args + '\'] not found', 'not found');
            return d.msg.reply({ embeds: [embedError] });
        }
        var member = d.guild.members.cache.find((x) => x.id === user.id);
        if (member) {
            a = `**Joined:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;
        }
        embed.title = `${user.username + '#' + user.discriminator} Information`;
        embed.description = `**Nick:** \`${(member === null || member === void 0 ? void 0 : member.nickname) || user.username}\`
**Id:** \`${user.id}\`
**Is Bot?:** ${user.bot ? 'Yes' : 'No'}${a ? '\n' + a : ''}

[avatar](${user.displayAvatarURL({ dynamic: !0, size: 4096 })})`;
        embed.thumbnail = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        d.msg.reply({ embeds: [embed] });
    })
};
