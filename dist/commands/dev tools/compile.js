"use strict";
module.exports = {
    name: 'compile',
    desc: 'Compile ts files',
    run: async (d) => {
        if (!['735170692915396698', '788869971073040454'].includes(d.author.id))
            return d.msg.reply('This command is for my developers only');
        var msg = await d.msg.reply('Starting to compile');
        var start = Date.now();
        await d.exec('tsc');
        var fields = d.util.makeFields(['Compilation delay', `\`\`\`\n${Date.now() - start}Ms\`\`\``], ['Total compiled files', `\`\`\`\n${require('glob').sync('/home/runner/LapplandTS/dist/**').length}\`\`\``]);
        msg.edit({ embeds: [
                d.util.makeEmbed(d, `${d.emotes.lappy} | Compiled files`, null, fields)
            ], content: ' ' });
    }
};
