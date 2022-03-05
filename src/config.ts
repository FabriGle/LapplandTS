var { Intents } = require('discord.js');
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
export var bot={
	allowedMentions: {
		repliedUser: false
	},
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
	],
	presence: {
		status: 'dnd',
		activities: [
			{
				name: 'New prototypes, new Utils, basically, new system',
				type: 0
			}
		]
	}
};
export var Emotes = {
	error: '<:lappyAaa:913295794151501864>',
	rip: '<:lappydeath:902410489458475068>',
	facha: '<:lappyfacha:902410117826351154>',
	feli: '<:lappyfeli:913295978205966338>',
	food: '<:lappyfood:913295896899383306>',
	tofu: '<:lappytofu:902410429601570866>',
	death: '<:lappy_:902410151766667275> ',
	lappy: '<:lappy:902410135958343680>'
};
export var music = {
	plugins: [new SpotifyPlugin(),new SoundCloudPlugin()],
	nsfw: !0,
	updateYouTubeDL: !1,
	youtubeDL: !1
};