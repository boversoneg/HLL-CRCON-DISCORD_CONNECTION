const { MessageFlags, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js'); 
const { translateString } = require('../stringsTranslation.js');
const { gatherApiInformations } = require('../api.js');
const util = require('util');

require('dotenv').config();

module.exports = {
    data: {
        customId: 'verify'
    },

    async execute(interaction) {
        // Get the connection from the client
        let mysqlConnection = interaction.client.connection;
        
        // Promisify the query
        const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

        // Get the user ID
        const userID = interaction.user.id;

        // Check if the user is already authorized
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

        // Check if there are multiple servers
        const connectedServers = await gatherApiInformations(`${process.env.CRCONPanelURL}/api/get_server_list`, {
            "headers": {
                Authorization: `bearer ${process.env.CRCONAPIKey}`,
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
            },
        });

        if (!connectedServers) return interaction.reply({ content: translateString('invalid_api_connection'), flags: MessageFlags.Ephemeral });

        if (connectedServers.result.length >= 1) {
            const defaultServer = await gatherApiInformations(`${process.env.CRCONPanelURL}/api/get_name`, {
                "headers": {
                    Authorization: `bearer ${process.env.CRCONAPIKey}`,
                    Connection: 'keep-alive',
                    'Content-Type': 'application/json',
                },
            });

            if (!defaultServer) return interaction.reply({ content: translateString('invalid_api_connection'), flags: MessageFlags.Ephemeral });

            const embed = new EmbedBuilder()
                .setTitle(translateString('multiple_servers_title'))
                .setDescription(translateString('multiple_servers_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('server_select_verify')
                .setPlaceholder(translateString('select_server'))
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(defaultServer.result)
                        .setValue('default')
                );

            connectedServers.result.forEach(server => {
                selectMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(server.name)
                        .setValue(server.link.toString())
                );
            });

            const row = new ActionRowBuilder()
                .addComponents(selectMenu);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral, components: [row] });
        }

        // Get the player name
        const exactPlayerNameQuery = await gatherApiInformations(`${process.env.CRCONPanelURL}/api/get_player_profile?player_id=${playerQuery[0].hll_id}`, {
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
                .setDescription(translateString('player_not_found_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        let exactPlayerName = exactPlayerNameQuery.result.names[0].name;
        
        // Get the latest player message
        const latestPlayerMessage = await gatherApiInformations(`${process.env.CRCONPanelURL}/api/get_recent_logs?filter_player=${exactPlayerName}`, {
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
                .setDescription(translateString('authorization_failed_desc'))
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