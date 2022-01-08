"use strict";
module.exports = {
    name: 'autoplay',
    desc: 'toggles autoplay mode',
    aliases: ['radio', 'auto'],
    run: (d) => {
        var embed = {};
        if (!d.member.voice.channel) {
            embed = d.util.makeError(d, 'u must be in a voice channel!', 'voice');
            return d.msg.reply({ embeds: [embed] });
        }
        if (!d.queue) {
            embed = d.util.makeError(d, 'There is nothing playing!', 'queue');
        }
        var ap = d.queue.toggleAutoplay();
        return d.msg.reply('autoplay has been ' + ap ? 'activated' : 'disabled');
    }
};
