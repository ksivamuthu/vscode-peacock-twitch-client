import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Event } from "vscode";
import { TwitchClientStatus } from "./Enum";
import { AuthenticationService } from "./Authentication";


export async function createStatusBarItem(context: ExtensionContext, authService: AuthenticationService) {
    const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    const user = await authService.currentUser();
    updateStatusBarItem(statusBarItem, user ? TwitchClientStatus.loggedIn : TwitchClientStatus.loggedOut, user ? user.login : '');

    context.subscriptions.push(statusBarItem, authService.onAuthStatusChanged(async (status) => {
        const user = await authService.currentUser();
        updateStatusBarItem(statusBarItem, status, user.login);
    }));
    return statusBarItem;
}

function updateStatusBarItem(statusBarItem: StatusBarItem, authStatus: TwitchClientStatus,
    userName?: string | undefined) {
    let text = 'Peacock Twitch: ';
    statusBarItem.show();

    switch (authStatus) {
        case TwitchClientStatus.loggingIn:
            text += 'Logging In...';
            break;
        case TwitchClientStatus.loggedIn:
            text += userName;
            break;
        case TwitchClientStatus.loggedOut:
            statusBarItem.hide();
            break;
    }

    statusBarItem.text = text;
}