const { SlashCommandBuilder, EmbedBuilder, MessageFlags, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { translateString, gatherCommandTranslation } = require('../../stringsTranslation.js');
const util = require('util');

function generate_code(length) { // Found and copied from: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setNameLocalizations(gatherCommandTranslation('connect'))

        .setDescription('Authorize and connect your Discord account with HLL in-game account.')
        .setDescriptionLocalizations(gatherCommandTranslation('connect_desc'))

        .addStringOption(option => option
            .setName('player_id')
            .setNameLocalizations(gatherCommandTranslation('player_id'))

            .setDescription('Enter your HLL in-game player ID (Can be found in top-right side of the screen in Options menu).')
            .setDescriptionLocalizations(gatherCommandTranslation('player_id_desc'))

            .setRequired(true)),

    async execute(interaction) {
        let mysqlConnection = interaction.client.connection;

        const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
        const userID = interaction.user.id;

        // Create buttons for future use 
        const verifyButton = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel(translateString('verify_button_label'))
            .setStyle(ButtonStyle.Success);
        
        const stopAuthButton = new ButtonBuilder()
            .setCustomId('stop_auth')
            .setLabel(translateString('delete_pending_auth_button_label'))
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(verifyButton)
            .addComponents(stopAuthButton);

        // Check if player already connected their Discord account with HLL in-game account || Check if player already created authorization code
        const connectStatus = await query('SELECT code, authorized FROM discord_codes WHERE discord_id = ?', [userID]);
        if (connectStatus.length > 0) {
            if (connectStatus[0].authorized == 1) {
                const embed = new EmbedBuilder()
                    .setTitle(translateString('already_connected_title'))
                    .setDescription(translateString('already_connected'))
                    .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                    .setColor(0xff0000);

                return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }

            let translatedString = await translateString('auth_code_already_generated')
            translatedString = translatedString.replace('{player_id}', interaction.options.getString('player_id'));
            translatedString = translatedString.replace('{code}', connectStatus[0].code);

            const embed = new EmbedBuilder()
                .setTitle(translateString('auth_code_already_generated_title'))
                .setDescription(translatedString)
                .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
                .setColor(0xff0000);

            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral, components: [row] });
        }

        // Generate authorization code
        const code = generate_code(6);

        // Send authorization code to player
        await query('INSERT INTO discord_codes (discord_id, hll_id, code) VALUES (?, ?, ?)', [userID, interaction.options.getString('player_id'), code]);

        let translatedString = await translateString('auth_code_success_generated')
        translatedString = translatedString.replace('{player_id}', interaction.options.getString('player_id'));
        translatedString = translatedString.replace('{code}', code);

        const embed = new EmbedBuilder()
            .setTitle(translateString('auth_code_success_generated_title'))
            .setDescription(translatedString)
            .setFooter({ text: 'Author: github.com/boversoneg | Discord: bover.', iconURL: 'https://avatars.githubusercontent.com/u/59316027?v=4' })
            .setColor(0x00ff00);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral, components: [row] });
    }
}