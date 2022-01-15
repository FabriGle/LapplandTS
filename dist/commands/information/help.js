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
    name: 'help',
    desc: 'uh~ well... a guide?',
    fields: [{ name: 'Command', opt: !0 }],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (!d.str_args)
            return d.msg.reply('wait, wait, patience is a virtue');
        var Cmd = yield d.client.commands.find((c) => { var _a; return (c === null || c === void 0 ? void 0 : c.name) === d.str_args || ((_a = c === null || c === void 0 ? void 0 : c.aliases) === null || _a === void 0 ? void 0 : _a.includes(d.str_args)); });
        var matchs = yield d.client.commands.filter((c) => { var _a; return (c === null || c === void 0 ? void 0 : c.name.includes(d.str_args)) || ((_a = c === null || c === void 0 ? void 0 : c.aliases) === null || _a === void 0 ? void 0 : _a.some((k) => k.includes(d.str_args))); });
        if (Cmd) {
            var [x, ...y] = Cmd.desc.split('');
            var embed = {
                title: `${d.emotes.lappy} | Help >> ${Cmd.name}`,
                thumbnail: { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) },
                fields: [{ name: 'Description', value: `\`\`\`\n${x.toUpperCase() + y.join('')}\`\`\`` }, { name: 'Category', value: `\`\`\`\n${Cmd.category}\`\`\`` }],
                color: '#001'
            };
            if (Cmd.aliases)
                embed.fields.push({ name: 'Aliases', value: `\`\`\`\n${d.util.firstUpper(Cmd.aliases.join(', '))}\`\`\`` });
            if (Cmd.fields)
                embed.fields.push({ name: 'Fields', value: `\`\`\`\n${Cmd.fields.map((f) => `${d.util.firstUpper(f.name)} | ${f.opt ? 'Not Required' : 'Required'}\n`)}\`\`\`` });
        }
        else if ((matchs === null || matchs === void 0 ? void 0 : matchs.length) > 0 && (matchs === null || matchs === void 0 ? void 0 : matchs.length) !== undefined) {
            var embed = {
                title: `${d.emotes.lappy} | Help >> Coincidences`,
                thumbnail: { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) },
                description: `\`\`\`\n${matchs.map((c) => c.name).join('\n')}\`\`\``,
                color: '#001'
            };
        }
        else
            var embed = d.util.makeError(d, 'i couldn\'t find that command. are u sure it belongs to me?', 'not found');
        return d.msg.reply({ embeds: [embed] });
    })
};
