"use strict";
module.exports = {
    name: 'reverse',
    desc: 'invert a text string',
    fields: [{ name: 'text', opt: !1 }],
    run: (d) => {
        if (!d.str_args) {
            var embedError = d.util.makeError(d, 'field 1 [\'text\'] cannot be empty', 'field');
            return d.msg.reply({ embeds: [embedError] });
        }
        return d.msg.reply(d.str_args.split('').reverse().join(''));
    }
};
