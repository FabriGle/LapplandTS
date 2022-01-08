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
        .setName('noembed')
        .setDescription('If the code will not be returned in embed')
        .setRequired(false)),
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (d.int.user.id !== '788869971073040454')
            return d.int.reply({ content: 'This command is for my developers only', ephemeral: !0 });
        var evaled = 'undefined', depth = 0, embed = {};
        try {
            evaled = yield eval(d.int.options.getString('code'));
        }
        catch (error) {
            var embedError = d.util.makeError(d, `Reason: ${error.message}`, error.name, '#001', d.int.user.displayAvatarURL({ dynamic: true, size: 4096 }));
            var row = {
                type: 1,
                components: [
                    {
                        label: 'View stack',
                        type: 2,
                        style: 1,
                        customId: 'STACK_' + d.util.snowflake(),
                        disabled: !1,
                        emoji: null
                    }
                ]
            };
            d.client.cache.set(row.components[0].customId, error.stack);
            return d.int.reply({ embeds: [embedError], components: [row] });
        }
        var to = typeof evaled;
        if (to == 'object')
            evaled = require('util').inspect(evaled, { depth: depth });
        if (d.int.options.getBoolean('noembed')) {
            return d.int.reply({
                content: `${evaled}` === 'undefined' ? 'Assessed correctly' : `${evaled}`,
                ephemeral: d.int.options.getBoolean('ephemeral') || false
            });
        }
        embed.title = `${d.emotes.tofu} | Eval`;
        embed.thumbnail = { url: d.int.user.displayAvatarURL({ dynamic: true, size: 4096 }) };
        embed.fields = [
            {
                name: ':incoming_envelope: | input',
                value: `\`\`\`ts\n${d.int.options.getString('code')}\n\`\`\``
            },
            {
                name: ':page_facing_up: | output',
                value: `\`\`\`ts\n${evaled}\n\`\`\``
            },
            {
                name: ':card_box: | typeof',
                value: `\`\`\`ts\n${to}\n\`\`\``
            }
        ];
        embed.color = '#000001';
        d.int.reply({
            embeds: [embed],
            ephemeral: d.int.options.getBoolean('ephemeral') || false
        });
    })
};
