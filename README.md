.<p align="center">
![](./resources/vscode.png)
![](./resources/peacock.png) 
![](./resources/twitch.png) 
</p>

# VSCode Peacock Twitch Extension

A Visual Studio Code extension that listens your twitch chat, viewers can change the vscode workspace color you are working by sending the command **!peacock**

## Features

Twitch chatters can change the color of your workspace from chat command:- **!peacock**
  * a random color
  * cop mode 
  * rainbow mode
  * the primary color for angular, vue, or react

![](./resources/peacock-twitch.gif)  

List of commands:

* !peacock random - Set the random color on your vscode workspace.
* !peacock angular - Set "Angular Red" color on your vscode workspace.
* !peacock vue - Set "Vue Green" color on your vscode workspace.
* !peacock react - Set "React Blue" color on your vscode workspace.
* !peacock rainbow - Set the rainbow colors on your vscode workspace
* !peacock cop  - Set the blue/red cop mode on your vscode workspace
* !peacock reset - Reset the color of workspace
* !peacock [named color] - Set the html named color on your vscode workspace

## Requirements

When you install this *vscode-peacock-twitch-client* extension, [vscode-peacock](https://github.com/johnpapa/vscode-peacock) will be installed together, since this extension relies on [vscode-peacock](https://github.com/johnpapa/vscode-peacock) extension to set colors in your workspace.

## How to connect to Twitch
* You can login to the twitch chat client using `Peacock Twitch: Sign In` command. Execute the commands from vscode command pallete. This will open the Twitch Authentication page. Login to your twitch account. The token is stored in secure keystorage.

  ![](resources/screenshot.png)

* You can logout from the chat once you are done with your twitch session.
* Connect to the chat client using `Peacock Twitch: Chat Connect` command.
* Disconnect from the chat client using `Peacock Twitch: Chat Disconnect` commands

## Credits

* Thanks for [John Papa](https://github.com/johnpapa) for giving permission to extend his peacock extension and PR to modify to make peacock extension to work with this extension.