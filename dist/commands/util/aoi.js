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
    name: 'aoi',
    aliases: ['aoijs', 'aoi.js'],
    desc: 'returns information from aoi.js functions',
    fields: [{ name: 'function', opt: !1 }],
    options: [{ name: 'list', desc: 'returns a list of matches' }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (!d.str_args) {
            var embedError = d.util.makeError(d, 'field 1 [\'function\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [embedError] });
        }
        if (d.str_args.includes('--list')) {
            yield d.removeArg('--list');
            var Funcs = (yield d.axios.default.request({ url: 'https://api.leref.ga/functions/' + d.args[0], method: 'GET' })).data.data.filter((F) => F.name.includes(d.args[0])), arr = [], n = (d.args[1] || 1) - 1, total = Funcs.length;
            Funcs.map((f, i) => {
                if (i > 10)
                    return;
                arr.push(`[${f.name}](https://aoi.js.org/docs#/function/${f.name})`);
            });
            return d.msg.reply({ embeds: [{
                        author: { name: `Coincidences: ${total}` },
                        title: d.emotes.lappy + ' | List',
                        description: arr.join('\n'),
                        footer: { text: 'Functions provided by official aoi.js API' },
                        color: '#6F96DE'
                    }] });
        }
        else {
            var Funcs = null, n = (d.args[1] || 1) - 1;
            d.axios.default.request({ url: 'https://api.leref.ga/functions/' + d.args[0], method: 'GET' }).then((req) => {
                Funcs = req.data.data;
                if (Funcs.length == 0) {
                    var embedError = d.util.makeError(d, `The function ['${d.args[0]}'] could not be found`, 'not found');
                    return d.msg.reply({ embeds: [embedError] });
                }
                var Func = Funcs[n];
                return d.msg.reply({ embeds: [{
                            author: { name: `Coincidences: ${Funcs.length}` },
                            title: Func.name,
                            url: 'https://aoi.js.org/docs#/function/' + Func.name,
                            description: `${Func.desc}
	\`\`\`js\n${Func.usage}\`\`\``,
                            footer: { text: 'Function data provided by official aoi.js API' },
                            color: '#6F96DE'
                        }] });
            }).catch((e) => {
                var embedError = d.util.makeError(d, `The function ['${d.args[0]}'] could not be found`, 'not found');
                return d.msg.reply({ embeds: [embedError] });
            });
        }
    })
};