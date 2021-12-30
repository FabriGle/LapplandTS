"use strict";
var { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Returns the information of a user')
        .addUserOption((option) => option
        .setRequired(false)
        .setName('target')
        .setDescription('The user whose information you want to see')),
    run: (d) => {
        var user = d.int.options.getUser('target'), embed = {}, a = '';
        if (!user)
            user = d.int.user;
        var member = d.int.guild.members.cache.find((x) => x.id === user.id);
        if (member) {
            a = `**Joined:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;
        }
        embed.title = `${user.username + '#' + user.discriminator} Information`;
        embed.description = `**Nick:** \`${member.nickname || user.username}\`
**Id:** \`${user.id}\`
**Is Bot:** ${user.bot ? 'Yes' : 'No'}
${a}

[avatar](${user.displayAvatarURL({ dynamic: !0, size: 4096 })})`;
        embed.thumbnail = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        d.int.reply({ embeds: [embed] });
    }
};
