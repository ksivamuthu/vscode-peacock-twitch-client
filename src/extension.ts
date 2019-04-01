import * as dotenv from 'dotenv';
dotenv.config();

import * as vscode from 'vscode';
import ChatClient from './chat/ChatClient';
import { Options } from 'tmi.js';
import { Commands } from './Enum';
import { handleSignIn, handleSignOut } from './Authentication';

const opts: Options = {
	identity: {
		username: process.env.USERNAME,
		password: process.env.OAUTH_TOKEN,
	},
	channels: [
		'ksivamuthu'
	]
};
const chatClient = new ChatClient(opts);

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-peacock-twitch-client" is now active!');

	chatClient.activate();

	let helloWorld = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.commands.executeCommand('peacock.enterColor', "purple");
		vscode.window.showInformationMessage('Changed Peacock Color to Random');
	});

	let signInCommand = vscode.commands.registerCommand(Commands.twitchSignIn, handleSignIn);
	let signOutCommand = vscode.commands.registerCommand(Commands.twitchSignOut, handleSignOut);

	context.subscriptions.push(helloWorld, signInCommand, signOutCommand);
}

export function deactivate() {
	chatClient.deactivate();
}