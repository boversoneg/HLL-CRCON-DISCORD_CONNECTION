let translatedStrings = {
    en: {
        already_connected_title: 'You already connected your account',
        already_connected: 'You already connected your Discord account with HLL in-game account. You can disconnect them to change player id using `/disconnect` command.',
        auth_code_already_generated_title: 'You already created your authorization code',
        auth_code_success_generated_title: 'Authorization code successfully generated',

        // When you want to translate this string remember to use {code} and {player_id} in place where you want to display the authorization code and player ID 
        auth_code_already_generated: 'You already created your authorization code.\n\nYour provided account ID is: **{player_id}**\nYour authorization code is: **{code}**\n\nPlease type this code in the game chat and then press "Verify" button below to finish the connection process.',

        // When you want to translate this string remember to use {code} and {player_id} in place where you want to display the authorization code and player ID
        auth_code_success_generated: 'Your authorization code has been successfully generated.\n\nYour provided account ID is: **{player_id}**\nYour authorization code is: **{code}**\n\nPlease type this code in the game chat and then press "Verify" button below to finish the connection process.',

        verify_button_label: 'Verify',
        delete_pending_auth_button_label: 'Delete pending authorization',
        player_not_found_title: 'Player not found',
        player_not_found_desc: 'Could not find the player with provided ID. Please use the `/connect` command and make sure your player ID is correct, if not - use `Delete pending authorization` button and start again.',
        authorization_not_started_title: 'You did not start connecting your account yet',
        authorization_not_started_desc: 'You have not started connecting your account yet. First please use the `/connect` command.',
        authorization_stopped_title: 'Authorization process stopped',
        authorization_stopped_desc: 'Authorization process has been stopped. You can start it again by using the `/connect` command.',
        not_connected_title: 'You are not connected yet',
        not_connected_desc: 'You are not connected with your HLL account yet. You can connect your accounts using `/connect` command.',
        disconnect_success_title: 'Successfully disconnected',
        disconnect_success_desc: 'You have successfully disconnected your Discord account from HLL in-game account.',
        player_id_in_use_title: 'Player ID already in use',
        player_id_in_use_desc: 'This player ID is already connected to another Discord account. Please use another player ID.',
        authorization_success_title: 'Authorization has been successfully completed',
        authorization_success_desc: 'You have successfully connected your Discord account with your HLL in-game account.',
        authorization_failed_title: 'Authorization failed',
        authorization_failed_desc: 'The provided code does not match the one in the game chat. Please try again.\n\n**Note:** If you have problems with authorizating, check if your provided player ID match your in-game player ID. If you still have problems, wait couple minutes and try again, if problem persists please contact the server administrator.',
    },

    pl: {
        already_connected_title: 'Już połączyłeś swoje konto',
        already_connected: 'Już połączyłeś swoje konto Discord z kontem w grze HLL. Możesz je rozłączyć, aby zmienić ID gracza używając komendy `/rozlacz`.',
        auth_code_already_generated_title: 'Już wygenerowałeś swój kod autoryzacyjny',
        auth_code_already_generated: 'Już wygenerowałeś swój kod autoryzacyjny.\n\nPodane ID konta: **{player_id}**\nTwój kod autoryzacyjny to: **{code}**\n\nNapisz ten kod na chacie w grze, a następnie naciśnij przycisk "Zweryfikuj" pod tą wiadomością, aby dokończyć proces połączenia.',
        auth_code_success_generated_title: 'Kod autoryzacyjny został pomyślnie wygenerowany',
        auth_code_success_generated: 'Twój kod autoryzacyjny został pomyślnie wygenerowany.\n\nPodane ID konta: **{player_id}**\nTwój kod autoryzacyjny to: **{code}**\n\nNapisz ten kod na chacie w grze, a następnie naciśnij przycisk "Zweryfikuj" pod tą wiadomością, aby dokończyć proces połączenia.',
        verify_button_label: 'Zweryfikuj',
        delete_pending_auth_button_label: 'Usuń oczekującą autoryzację',
        player_not_found_title: 'Nie znaleziono gracza',
        player_not_found_desc: 'Nie udało się znaleźć gracza o podanym ID. Użyj najpierw komendy `/polacz` i upewnij się, że podałeś poprawne ID gracza, jeśli nie - użyj przycisku `Usuń oczekującą autoryzację` i zacznij od nowa.',
        authorization_not_started_title: 'Nie zacząłeś jeszcze procesu łączenia swojego konta',
        authorization_not_started_desc: 'Nie zacząłeś jeszcze procesu łączenia swojego konta. Użyj najpierw komendy `/polacz`.',
        authorization_stopped_title: 'Proces autoryzacji zatrzymany',
        authorization_stopped_desc: 'Proces autoryzacji został zatrzymany. Możesz go zacząć od nowa używając komendy `/polacz`.',
        not_connected_title: 'Nie jesteś jeszcze połączony',
        not_connected_desc: 'Nie jesteś jeszcze połączony ze swoim kontem HLL. Możesz połączyć swoje konta używając komendy `/polacz`.',
        disconnect_success_title: 'Rozłączono pomyślnie',
        disconnect_success_desc: 'Pomyślnie rozłączono twoje konto Discord z kontem w grze HLL.',
        player_id_in_use_title: 'ID gracza jest już w użyciu',
        player_id_in_use_desc: 'To ID gracza jest już połączone z innym kontem Discord. Proszę użyj innego ID gracza.',
        authorization_success_title: 'Autoryzacja zakończona pomyślnie',
        authorization_success_desc: 'Pomyślnie połączyłeś swoje konto Discord z kontem w grze HLL.',
        authorization_failed_title: 'Autoryzacja nie powiodła się',
        authorization_failed_desc: 'Podany kod nie pasuje do tego z gry. Spróbuj ponownie.\n\n**Uwaga:** Jeśli masz problemy z autoryzacją, sprawdź, czy podane ID gracza pasuje do twojego ID gracza w grze. Jeśli nadal masz problemy, poczekaj kilka minut i spróbuj ponownie, jeśli problem nadal występuje, skontaktuj się z administratorem serwera.',
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

    disconnect: {
        'en-US': 'disconnect',
        'en-GB': 'disconnect',
        pl: 'rozlacz',
    },

    disconnect_desc: {
        'en-US': 'Deauthorize and disconnect your Discord account from HLL in-game account.',
        'en-GB': 'Deauthorize and disconnect your Discord account from HLL in-game account.',
        pl: 'Deautoryzuj i rozłącz swoje konto Discord z kontem w grze HLL.',
    },
}

// Available languages: 'en', 'pl'
let defaultLanguage = 'en';

function translateString(string) {
    return translatedStrings[defaultLanguage][string] || translatedStrings['en'][string];
}

function gatherCommandTranslation(command) {
    return commandsTranslation[command];
}

module.exports = {
    translateString,
    gatherCommandTranslation,
}