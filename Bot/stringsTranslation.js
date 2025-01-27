let translatedStrings = {
    en: {
        already_connected_title: 'You already connected your account',
        already_connected: 'You already connected your Discord account with HLL in-game account.',
        auth_code_already_generated_title: 'You already created your authorization code',

        // When you want to translate this string remember to use {code} and {player_id} in place where you want to display the authorization code and player ID 
        auth_code_already_generated: 'You already created your authorization code.\n\nYour provided account ID is: **{player_id}**\nYour authorization code is: **{code}**\n\nPlease type this code in the game chat and then press "Verify" button below to finish the connection process.',

        auth_code_success_generated_title: 'Authorization code successfully generated',

        // When you want to translate this string remember to use {code} and {player_id} in place where you want to display the authorization code and player ID
        auth_code_success_generated: 'Your authorization code has been successfully generated.\n\nYour provided account ID is: **{player_id}**\nYour authorization code is: **{code}**\n\nPlease type this code in the game chat and then press "Verify" button below to finish the connection process.',
    },

    pl: {
        already_connected_title: 'Już połączyłeś swoje konto',
        already_connected: 'Już połączyłeś swoje konto Discord z kontem w grze HLL.',
        auth_code_already_generated_title: 'Już wygenerowałeś swój kod autoryzacyjny',
        auth_code_already_generated: 'Już wygenerowałeś swój kod autoryzacyjny.\n\nPodane ID konta: **{player_id}**\nTwój kod autoryzacyjny to: **{code}**\n\nNapisz ten kod na chacie w grze, a następnie naciśnij przycisk "Zweryfikuj" pod tą wiadomością, aby dokończyć proces połączenia.',
        auth_code_success_generated_title: 'Kod autoryzacyjny został pomyślnie wygenerowany',
        auth_code_success_generated: 'Twój kod autoryzacyjny został pomyślnie wygenerowany.\n\nPodane ID konta: **{player_id}**\nTwój kod autoryzacyjny to: **{code}**\n\nNapisz ten kod na chacie w grze, a następnie naciśnij przycisk "Zweryfikuj" pod tą wiadomością, aby dokończyć proces połączenia.',
    },
}

// Discord interaction commands translations locale. Country codes can be found here: https://discord-api-types.dev/api/discord-api-types-v10/enum/Locale
let commandsTranslation = {
    connect: {
        'en-US': 'connect',
        'en-GB': 'connect',
        pl: 'polacz',
    },

    connect_desc: {
        'en-US': 'Authorize and connect your Discord account with HLL in-game account.',
        'en-GB': 'Authorize and connect your Discord account with HLL in-game account.',
        pl: 'Autoryzuj i połącz swoje konto Discord z kontem w grze HLL.'
    },

    player_id: {
        'en-US': 'player_id',
        'en-GB': 'player_id',
        pl: 'id_gracza',
    },

    player_id_desc: {
        'en-US': 'Enter your HLL in-game player ID (Can be found in top-right side of the screen in Options menu).',
        'en-GB': 'Enter your HLL in-game player ID (Can be found in top-right side of the screen in Options menu).',
        pl: 'Wpisz swoje ID gracza z gry HLL (Można je znaleźć w prawym górnym rogu ekranu w menu Opcji).',
    },
}

// Available languages: 'en', 'pl'
let defaultLanguage = 'en';

function translateString(string) {
    return translatedStrings[defaultLanguage][string];
}

function gatherCommandTranslation(command) {
    return commandsTranslation[command];
}

module.exports = {
    translateString,
    gatherCommandTranslation,
}