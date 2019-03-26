import * as vscode from 'vscode';
import { Commands } from '../Enum';

export class PeacockCommands {
    public async handleCommands(command: string, param: string) {
        if (command !== '!peacock') {
            return;
        }
        param = param.toLowerCase();

        if (param === 'random') {
            await vscode.commands.executeCommand(Commands.changeColorToRandom);
            vscode.window.showInformationMessage('Changed Peacock Color to Random');
        } else if (param === 'reset') {
            await vscode.commands.executeCommand(Commands.resetColors);
            vscode.window.showInformationMessage('Reset Peacock Colors');
        } else if (param === 'vue') {
            await vscode.commands.executeCommand(Commands.changeColorToVueGreen);
            vscode.window.showInformationMessage('Changed Peacock Color to Vue Green');
        } else if (param === 'angular') {
            await vscode.commands.executeCommand(Commands.changeColorToAngularRed);
            vscode.window.showInformationMessage('Changed Peacock Color to Angular Red');
        } else if (param === 'react') {
            await vscode.commands.executeCommand(Commands.changeColorToReactBlue);
            vscode.window.showInformationMessage('Changed Peacock Color to React Blue');
        }
    }
}