"use strict";
var { Intents } = require('discord.js'), { SoundCloudPlugin } = require('@distube/soundcloud'), { SpotifyPlugin } = require('@distube/spotify');
module.exports = {
    Bot: {
        allowedMentions: {
            repliedUser: false
        },
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES
        ],
        presence: {
            status: 'dnd',
            activities: [{ name: 'Now in TypeScript!!', type: 0 }]
        }
    },
    Emotes: {
        error: '<:lappyAaa:913295794151501864>',
        rip: '<:lappydeath:902410489458475068>',
        facha: '<:lappyfacha:902410117826351154>',
        feli: '<:lappyfeli:913295978205966338>',
        food: '<:lappyfood:913295896899383306>',
        tofu: '<:lappytofu:902410429601570866>',
        death: '<:lappy_:902410151766667275> ',
        lappy: '<:lappy:902410135958343680>'
    },
    DisTube: {
        plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
        nsfw: !0,
        updateYouTubeDL: !1
    }
};
