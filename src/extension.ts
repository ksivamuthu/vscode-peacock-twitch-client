import * as dotenv from 'dotenv';
dotenv.config();

import * as vscode from 'vscode';
import ChatClient from './chat/ChatClient';
import { Commands } from './Enum';
import { AuthenticationService } from './Authentication';
import { Constants } from './Constants';

const authService = new AuthenticationService();
authService.on('SignInSuccess', async () => {
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
});

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-peacock-twitch-client" is now active!');

	let signInCommand = vscode.commands.registerCommand(Commands.twitchSignIn, authService.handleSignIn.bind(authService));
	let signOutCommand = vscode.commands.registerCommand(Commands.twitchSignOut, authService.handleSignOut.bind(authService));

	context.subscriptions.push(signInCommand, signOutCommand);
}

export function deactivate() {
	authService.handleSignOut();
}