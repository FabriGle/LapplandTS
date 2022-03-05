"use strict";
module.exports = {
    name: 'stop',
    desc: 'stop the songs',
    aliases: ['disconnect', 'ds', 'leave'],
    run: (d) => {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
            return d.msg.reply({ embeds: [embed] });
        }
        d.queue.stop();
        return d.msg.reply('Leaving voice channel');
    }
};
