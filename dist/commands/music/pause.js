"use strict";
module.exports = {
    name: 'pause',
    desc: 'Pause the songs',
    run: (d) => {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
        }
        try {
            d.queue.pause();
            return d.msg.reply('songs are paused');
        }
        catch {
            embed = d.util.makeError(d, 'Can\'t pause the queue', 'queue');
            return d.msg.reply({ embeds: [embed] });
        }
    }
};
