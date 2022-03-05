"use strict";
module.exports = {
    name: 'reboot',
    aliases: ['rt'],
    desc: 'The name is not quite descriptive?',
    run: async (d) => {
        await d.util.reboot();
    }
};
