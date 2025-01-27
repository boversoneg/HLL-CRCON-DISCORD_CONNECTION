const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { translateString, gatherCommandTranslation } = require('../../stringsTranslation.js');
const util = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setNameLocalizations(gatherCommandTranslation('disconnect'))

        .setDescription('Deauthorize and disconnect your Discord account from HLL in-game account.')
        .setDescriptionLocalizations(gatherCommandTranslation('disconnect_desc')),

    async execute(interaction) {
        let mysqlConnection = interaction.client.connection;

        const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const userID = interaction.user.id;

        // Check if player already connected their Discord account with HLL in-game account || Check if player already created authorization code
        const connectStatus = await query('SELECT code, authorized FROM discord_codes WHERE discord_id = ?', [userID]);
        if ((connectStatus.length > 0 && connectStatus[0].authorized == 0) || connectStatus.length <= 0) {
            const embed = new EmbedBuilder()
                .setTitle(translateString('not_connected_title'))
                .setDescription(translateString('not_connected_desc'))
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        // Send authorization code to player
        await query('DELETE FROM discord_codes WHERE discord_id = ?', [userID]);

        const embed = new EmbedBuilder()
            .setTitle(translateString('disconnect_success_title'))
            .setDescription(translateString('disconnect_success_desc'))
            .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
            .setColor(0x00ff00);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
}