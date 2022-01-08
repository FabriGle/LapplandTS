"use strict";
var { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Returns the avatar of a user')
        .addUserOption((option) => option
        .setRequired(false)
        .setName('target')
        .setDescription('The user whose avatar you want to see')),
    run: (d) => {
        var user = d.int.options.getUser('target'), embed = {}, a = '';
        if (!user)
            user = d.int.user;
        var member = d.int.guild.members.cache.find((x) => x.id === user.id);
        embed.title = `${user.username + '#' + user.discriminator} Icon`;
        embed.image = { url: user.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        d.int.reply({ embeds: [embed] });
    }
};
