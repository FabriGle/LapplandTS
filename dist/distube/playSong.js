"use strict";
module.exports = async (_, q, s) => {
    var m = await q.textChannel.send({
        content: `Playing \`${s.name}\`.\nRequested by ${s.user.tag}`
    });
    setTimeout(() => m.delete(), 6000);
};
