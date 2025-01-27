const { MessageFlags, EmbedBuilder } = require('discord.js'); 
const { request } = require('undici');
const { translateString } = require('../stringsTranslation.js');
const util = require('util');

require('dotenv').config();

module.exports = {
    data: {
        customId: 'verify'
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

        const exactPlayerNameQuery = await request(`${process.env.CRCONPanelURL}/api/get_player_profile?player_id=${playerQuery[0].hll_id}`, {
            "headers": {
                Authorization: `bearer ${process.env.CRCONAPIKey}`,
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
            },
        });
        
        let exactPlayerName = await exactPlayerNameQuery.body.json();

        if (!exactPlayerName.result) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('player_not_found_title'))
                .setDescription(translateString('player_not_found_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        exactPlayerName = exactPlayerName.result.names[0].name;
        
        const latestPlayerMessage = await request(`${process.env.CRCONPanelURL}/api/get_recent_logs?filter_player=${exactPlayerName}`, {
            "headers": {
                Authorization: `bearer ${process.env.CRCONAPIKey}`,
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
            },
        });
        
        let latestPlayerMessageContent = await latestPlayerMessage.body.json();
        latestPlayerMessageContent = latestPlayerMessageContent.result.logs[0].sub_content;

        if (latestPlayerMessageContent == playerQuery[0].code) {
            await query('UPDATE discord_codes SET authorized = 1 WHERE discord_id = ?', [userID]);

            const embed = new EmbedBuilder()
                .setTitle('Authorization has been successfully completed')
                .setDescription('You have successfully connected your Discord account with your HLL in-game account.')
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0x00ff00);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }
        
        const embed = new EmbedBuilder()
            .setTitle('Authorization failed')
            .setDescription('The provided code does not match the one in the game chat. Please try again.\n\n**Note:** If you have problems with authorizating, check if your provided player ID match your in-game player ID. If you still have problems, wait couple minutes and try again, if problem persists please contact the server administrator.')
            .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
            .setColor(0xff0000);

        return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
}