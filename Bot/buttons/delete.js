const { MessageFlags, EmbedBuilder } = require('discord.js'); 
const { translateString } = require('../stringsTranslation.js');
const util = require('util');

module.exports = {
    data: {
        customId: 'stop_auth'
    },

    async execute(interaction) {
        let mysqlConnection = interaction.client.connection;
        
        const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const userID = interaction.user.id;

        const playerQuery = await query('SELECT hll_id, code, authorized FROM discord_codes WHERE discord_id = ?', [userID]);

        if (playerQuery.length <= 0) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('authorization_not_started_title'))
                .setDescription(translateString('authorization_not_started_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        if (playerQuery[0].authorized == 1) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('already_connected_title'))
                .setDescription(translateString('already_connected'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        await query('DELETE FROM discord_codes WHERE discord_id = ?', [userID]);

        const embed = new EmbedBuilder()
            .setTitle(translateString('authorization_stopped_title'))
            .setDescription(translateString('authorization_stopped_desc'))
            .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
            .setColor(0xff0000);

        return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
}