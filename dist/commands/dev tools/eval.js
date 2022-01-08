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
    name: 'eval',
    desc: 'Evaluate javascript code',
    options: [{ name: 'noembed', desc: 'Makes the return not embed' }],
    fields: [{ name: 'code', opt: !1 }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (!['735170692915396698', '788869971073040454'].includes(d.author.id))
            return d.msg.reply('This command is for my developers only');
        d.suppressUpperCase = !0;
        var Start = Date.now(), axios = require('axios'), dsc = require('discord.js'), http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), cld = require('child_process'), exec = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield cld.execSync(data); }), os = require('os'), cpu = os.cpus()[0], x = null, y = null, z = null, str = new String(), arr = new Array(), obj = new Object(), num = new Number();
        var evaled = 'undefined', depth = 0, embed = {}, ne = d.args.includes('--noembed');
        try {
            ne ? (d.removeArg('--noembed'), evaled = eval(`(async()=>${d.str_args})()`)) : evaled = yield eval(`(async()=>${d.str_args})()`);
        }
        catch (error) {
            var embedError = d.util.makeError(d, `Reason: ${error.message}`, error.name);
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
            return d.msg.reply({ embeds: [embedError], components: [row] });
        }
        var to = typeof evaled;
        if (to == 'object')
            evaled = require('util').inspect(evaled, { depth: depth });
        if (ne) {
            return d.msg.reply({
                content: `${evaled}` === 'undefined' ? 'Assessed correctly' : `${evaled}`
            });
        }
        embed.title = `${d.emotes.tofu} | Eval`;
        embed.thumbnail = { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.fields = [
            {
                name: ':incoming_envelope: | input',
                value: `\`\`\`ts\n${d.str_args}\n\`\`\``
            },
            {
                name: ':page_facing_up: | output',
                value: `\`\`\`ts\n${evaled}\n\`\`\``
            },
            {
                name: ':card_box: | typeof',
                value: `\`\`\`ts\n${to}\n\`\`\``
            },
            {
                name: ':stopwatch: | execution time',
                value: `\`\`\`ts\n${Date.now() - Start}Ms\n\`\`\``
            }
        ];
        embed.color = '#001';
        d.msg.reply({
            embeds: [embed]
        });
    })
};
