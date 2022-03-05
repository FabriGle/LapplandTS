"use strict";
var { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Returns the level of a user')
        .addUserOption((option) => option
        .setRequired(false)
        .setName('target')
        .setDescription('The user whose level you want to see')),
    run: async (d) => {
        var user = d.int.options.getUser('target'), embed = {}, a = '';
        if (!user)
            user = d.int.user;
        var t = await d.client.db.get('GLOBAL_XP', user.id, { level: 1, current_xp: 0, req_xp: 500 });
        embed.title = `${user.username + '#' + user.discriminator} Rank Card`;
        embed.description = `**Level:** \`${t.level}\`\n**XP:** ${t.current_xp}/${t.req_xp}`;
        embed.thumbnail = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        d.int.reply({ embeds: [embed] });
    }
};
