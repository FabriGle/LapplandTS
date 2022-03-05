"use strict";
module.exports = {
    name: 'shutdown',
    aliases: ['killprocess'],
    desc: 'Kills all running processes',
    run: (d) => {
        d.msg.reply('Au revoir');
        process.exit();
    }
};
