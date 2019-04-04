import * as dotenv from 'dotenv';
dotenv.config();

import * as vscode from 'vscode';
import ChatClient from './chat/ChatClient';
import { Commands, TwitchClientStatus } from './Enum';
import { AuthenticationService } from './Authentication';
import { Constants } from './Constants';
import { createStatusBarItem } from './StatusBar';

const authService = new AuthenticationService();
authService.onAuthStatusChanged(async (status) => {
	if (status === TwitchClientStatus.loggedIn) {
		const user = await authService.currentUser();
		if (user && user.accessToken) {
			const chatClient = new ChatClient({
				identity: {
					username: Constants.chatClientUserName,
					password: user.accessToken,
				},
				channels: [user.login]
			});

			chatClient.activate();
		}
	}
});

export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-peacock-twitch-client" is now active!');

	const statusBarItem = await createStatusBarItem(context, authService);
	let signInCommand = vscode.commands.registerCommand(Commands.twitchSignIn, authService.handleSignIn.bind(authService));
	let signOutCommand = vscode.commands.registerCommand(Commands.twitchSignOut, authService.handleSignOut.bind(authService));

	context.subscriptions.push(signInCommand, signOutCommand, statusBarItem);
}

export function deactivate() {
	authService.handleSignOut();
}