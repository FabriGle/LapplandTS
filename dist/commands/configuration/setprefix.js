"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    name: 'set-prefix',
    aliases: ['setprefix', 'prefix'],
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (d.str_args) {
            if (!d.hasPerms('manage_guild')) {
                var embedError = d.util.makeError(d, 'You do not have permission to do this\n\nRequired: \'Manage Guild\'', 'Permissions');
                return d.msg.reply({ embeds: [embedError] });
            }
            yield d.client.db.set('GUILD_PREFIX', d.guild.id, d.first_arg);
            d.msg.reply(`\`Prefix changed to ${d.first_arg}\``);
        }
        else
            d.msg.reply(`\`my prefix on this server is '${d.client.prefix}'\``);
    })
};
