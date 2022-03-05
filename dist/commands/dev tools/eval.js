"use strict";
module.exports = { name: 'eval', desc: 'Evaluate javascript code', options: [{ name: 'noembed', desc: 'Makes the return not embed' }], fields: [{ name: 'code', opt: !1 }], run: async (d) => {
        if (!['735170692915396698', '788869971073040454'].includes(d.author.id))
            return d.msg.reply('This command is for my developers only');
        d.suppressUpperCase = !0;
        var Start = Date.now(), axios = d.axios, dsc = require('discord.js'), http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), cld = d.cld, exec = d.exec, os = d.os, cpu = d.cpu, x = null, y = null, z = null, str = new String(), arr = new Array(), obj = new Object(), num = new Number(), { random, msToTime, makeError, snowflake, reboot, findUser, findMember, color, makeEmbed, makeFields } = d.util, { author, client, member, channel, guild, emotes, perms, hasPerms, removeArg, command, cmd } = d, evaled = 'undefined', depth = 0, ne = d.args.includes('--noembed');
        try {
            ne ? (d.removeArg('--noembed'), evaled = await eval(`(async()=>${d.str_args})()`)) : evaled = await eval(`(async()=>${d.str_args})()`);
        }
        catch (e) {
            var embedError = d.util.makeError(d, `Reason: ${e.message}`, e.name), row = { type: 1, components: [{ label: 'View stack', type: 2, style: 1, customId: 'STACK_' + d.util.snowflake(), disabled: !1, emoji: null }] };
            d.client.cache.set(row.components[0].customId, e.stack);
            return d.msg.reply({ embeds: [embedError], components: [row] });
        }
        ;
        var to = typeof (evaled), to2 = d.util.type(evaled);
        if (to == 'object')
            evaled = require('util').inspect(evaled, { depth: depth });
        if (ne) {
            return d.msg.reply({ content: `${evaled}` === 'undefined' ? 'Assessed correctly' : `${evaled}` });
        }
        ;
        var fields = makeFields([':incoming_envelope: | input', d.str_args.toCode('js')], [':page_facing_up: | output', `${evaled}`.toCode('js')], [':card_box: | typeof', to2.toCode('js')], [':stopwatch: | execution time', `${Date.now() - Start}Ms`.toCode('js')]), embed = makeEmbed(d, `${d.emotes.tofu} | Eval`, null, fields);
        return d.msg.reply({ embeds: [embed] });
    } };
