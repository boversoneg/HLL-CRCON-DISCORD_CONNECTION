const { EmbedBuilder, MessageFlags } = require('discord.js');
const { gatherApiInformations } = require('../api.js');
const { translateString } = require('../stringsTranslation.js');
const util = require('util');

require('dotenv').config();

module.exports = {
    data: {
        customId: 'server_select_verify'
    },

    async execute(interaction) {
        // Get the connection from the client
        let mysqlConnection = interaction.client.connection;
        
        // Promisify the query
        const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

        // Get the user ID
        const userID = interaction.user.id;

        // Get the server api correct url
        const serverApiUrl = interaction.values[0] == 'default' ? process.env.CRCONPanelURL : interaction.values[0];

        const playerQuery = await query('SELECT hll_id, code, authorized FROM discord_codes WHERE discord_id = ?', [userID]);

        if (playerQuery.length <= 0) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('authorization_not_started_title'))
                .setDescription(translateString('authorization_not_started_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        if (playerQuery[0].authorized == 1) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('already_connected_title'))
                .setDescription(translateString('already_connected'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        // Get the player name
        const exactPlayerNameQuery = await gatherApiInformations(`${serverApiUrl}/api/get_player_profile?player_id=${playerQuery[0].hll_id}`, {
            "headers": {
                Authorization: `bearer ${process.env.CRCONAPIKey}`,
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
            },
        });

        if (!exactPlayerNameQuery) return interaction.reply({ content: translateString('invalid_api_connection'), flags: MessageFlags.Ephemeral });

        if (!exactPlayerNameQuery.result) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('player_not_found_title'))
                .setDescription(translateString('multiple_servers_player_not_found_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        let exactPlayerName = exactPlayerNameQuery.result.names[0].name;
        
        // Get the latest player message
        const latestPlayerMessage = await gatherApiInformations(`${serverApiUrl}/api/get_recent_logs?filter_player=${exactPlayerName}`, {
            "headers": {
                Authorization: `bearer ${process.env.CRCONAPIKey}`,
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
            },
        });
        
        if (!latestPlayerMessage) return interaction.reply({ content: translateString('invalid_api_connection'), flags: MessageFlags.Ephemeral });

        if (latestPlayerMessage.result.logs.length <= 0) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('authorization_failed_title'))
                .setDescription(translateString('multiple_servers_authorization_failed_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        let latestPlayerMessageContent = latestPlayerMessage.result.logs[0].sub_content;

        // Check if the player sent the same code
        if (latestPlayerMessageContent == playerQuery[0].code) {
            await query('UPDATE discord_codes SET authorized = 1 WHERE discord_id = ?', [userID]);

            const embed = new EmbedBuilder()
                .setTitle(translateString('authorization_success_title'))
                .setDescription(translateString('authorization_success_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0x00ff00);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }
        
        const embed = new EmbedBuilder()
            .setTitle(translateString('authorization_failed_title'))
            .setDescription(translateString('authorization_failed_desc'))
            .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
            .setColor(0xff0000);

        return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
}