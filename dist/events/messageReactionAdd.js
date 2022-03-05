"use strict";
module.exports = async (_, r, u) => {
    console.log(r.emoji.name);
    if (r.emoji.name !== '⭐')
        return;
    var ch = await _.channels.fetch('913243741710594048');
    ch.send({
        embeds: [{
                title: 'No se',
                url: r.message.url,
                description: r.message.content.toCode(),
                color: '#001',
                footer: `By: ${u.username}`
            }]
    });
};
