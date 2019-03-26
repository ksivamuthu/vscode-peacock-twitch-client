import * as vscode from 'vscode';
import ChatClient from './chat/ChatClient';
import { Options } from 'tmi.js';

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

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.commands.executeCommand('peacock.changeColorToRandom');
		vscode.window.showInformationMessage('Changed Peacock Color to Random');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	chatClient.deactivate();
}
