import * as vscode from 'vscode';
import { Commands } from '../Enum';

export class Peacock {
    private static PULSE_FREQUENCY: number = 10;

    public async handleCommands(command: string, param: string) {
        if (command !== '!peacock') {
            return;
        }
        param = param.toLowerCase().trim();

        if (param === 'random') {
            await vscode.commands.executeCommand(Commands.changeColorToRandom);
            vscode.window.showInformationMessage('Changed Peacock Color to Random');
        } else if (param === 'reset') {
            await vscode.commands.executeCommand(Commands.resetColors);
            vscode.window.showInformationMessage('Reset Peacock Colors');
        } else if (param === 'cop') {
            this.startCopMode();
        } else {
            await vscode.commands.executeCommand(Commands.enterColor, param);
            vscode.window.showInformationMessage(`Changed Peacock Color to ${param}`);
        }
    }

    private async startCopMode() {
        for (var i = 0; i < Peacock.PULSE_FREQUENCY; i++) {
            await vscode.commands.executeCommand(Commands.enterColor, 'red');
            await this.delay(100);
            await vscode.commands.executeCommand(Commands.enterColor, '#33A5FF');
            await this.delay(100);
        }
    }

    async delay(ms: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
}