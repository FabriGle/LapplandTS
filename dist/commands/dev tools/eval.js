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
        .setName('eval')
        .setDescription('Evaluate a code')
        .addStringOption((option) => option
        .setName('code')
        .setDescription('The code to be evaluated')
        .setRequired(true))
        .addBooleanOption((option) => option
        .setName('ephemeral')
        .setDescription('Return in ephemeral?')
        .setRequired(false))
        .addBooleanOption((option) => option
        .setName('codeblock')
        .setDescription('If the return will be in codeblock or not')
        .setRequired(false)),
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (d.int.user.id !== '788869971073040454')
            return d.int.replt({ content: 'This command is for my developers only' });
        var evaled = 'undefined', depth = 0;
        try {
            evaled = yield eval(d.int.options.getString('code'));
        }
        catch (error) {
            return d.int.reply({
                embeds: [
                    {
                        title: 'Error',
                        thumbnail: { url: d.int.user.displayAvatarURL({ dynamic: true, size: 4096 }) },
                        description: `\`\`\`bash\n${error.stack}\n\`\`\``,
                        color: '#CC0000'
                    }
                ]
            });
        }
        if (typeof evaled == 'object')
            evaled = require('util').inspect(evaled, { depth: depth });
        if (d.int.options.getBoolean('codeblock')) {
            evaled = `\`\`\`ts\n${evaled}\`\`\``;
        }
        d.int.reply({
            content: evaled || 'Assessed correctly',
            ephemeral: d.int.options.getBoolean('ephemeral') || false
        });
    })
};
