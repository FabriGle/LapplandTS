"use strict";
module.exports = {
    name: 'help',
    desc: 'uh~ well... a guide?',
    fields: [{ name: 'Command', opt: !0 }],
    run: async (d) => {
        var { makeEmbed } = d.util;
        if (!d.str_args)
            return d.msg.reply(`\`\`\`\n${d.client.prefix}help [Command or Category]\ncategories: util, configuration, dev tools, information and music\`\`\``);
        if (['util', 'configuration', 'dev tools', 'information', 'music'].includes(d.str_args.tlc())) {
            let desc = await d.client.cmds
                .filter((_) => _?.category === d.str_args.tlc())
                ?.map((_) => `**\`${_?.name}\`** - ${_?.desc}`)
                ?.join('\n');
            var embed = makeEmbed(d, `${d.emotes.lappy} | Help >> ${d.str_args.tlc()}`, desc);
            return d.msg.reply({ embeds: [embed] });
        }
        var Cmd = await d.client.cmds.find((c) => c?.name === d.str_args || c?.aliases?.includes(d.str_args)), matchs = await d.client.cmds.filter((c) => c?.name?.includes(d.str_args) || c?.aliases?.some((k) => k.includes(d.str_args)));
        if (Cmd) {
            var [x, ...y] = Cmd.desc.split('');
            var fields = d.util.makeFields(['Description', (x.toUpperCase() + y.join('')).toCode()], ['Category', Cmd.category.toCode()]);
            var embed = makeEmbed(d, `${d.emotes.lappy} | Help >> ${Cmd.name}`, null, fields);
            if (Cmd.aliases)
                embed.fields.push({ name: 'Aliases', value: Cmd.aliases.join(', ').firstUpper().toCode() });
            if (Cmd.fields)
                embed.fields.push({ name: 'Fields', value: Cmd.fields.map((f) => `${f.name.firstUpper()} | ${f.opt ? 'Not Required' : 'Required'}`).join('\n').toCode() });
            if (Cmd.options)
                embed.fields.push({ name: 'End Points', value: Cmd.options.map((o) => `${o.name.firstUpper()} | ${o.desc.firstUpper()}`).join('\n').toCode() });
        }
        else if (matchs?.size > 0) {
            var embed = makeEmbed(d, `${d.emotes.lappy} | Help >> Coincidences`, matchs.map((c) => c.name).join('\n').toCode());
        }
        else
            var embed = d.util.makeError(d, 'i couldn\'t find that command. are u sure it belongs to me?', 'not found');
        return d.msg.reply({ embeds: [embed] });
    }
};
