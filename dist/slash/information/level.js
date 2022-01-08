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
var { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Returns the level of a user')
        .addUserOption((option) => option
        .setRequired(false)
        .setName('target')
        .setDescription('The user whose level you want to see')),
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var user = d.int.options.getUser('target'), embed = {}, a = '';
        if (!user)
            user = d.int.user;
        var t = yield d.client.db.get('GLOBAL_XP', user.id, { level: 1, current_xp: 0, req_xp: 500 });
        embed.title = `${user.username + '#' + user.discriminator} Rank Card`;
        embed.description = `**Level:** \`${t.level}\`\n**XP:** ${t.current_xp}/${t.req_xp}`;
        embed.thumbnail = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        d.int.reply({ embeds: [embed] });
    })
};
