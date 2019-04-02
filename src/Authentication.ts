import * as vscode from 'vscode';
import * as http from 'http';
import * as path from 'path';
import * as url from 'url';
import { readFileSync } from 'fs';
import * as keytartype from 'keytar';
import { v4 } from 'uuid';
import { env } from 'vscode';
import { EventEmitter } from 'events';
import * as fetch from 'node-fetch';

const service = 'peacock-vscode-twitch-client';
const account = 'peacock-vscode-twitch';

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;

function getNodeModule<T>(moduleName: string): T | undefined {
    const r = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
    try {
        return r(`${env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) {
        // Not in ASAR.
    }
    try {
        return r(`${env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) {
        // Not available
    }
    return undefined;
}

const keytar: typeof keytartype | undefined = getNodeModule<typeof keytartype>('keytar');

export class AuthenticationService extends EventEmitter {

    public async handleSignIn() {
        this.handleSignOut();

        vscode.window.showInformationMessage('Signing in');
        if (keytar) {
            const accessToken = await keytar.getPassword(service, account);
            if (!accessToken) {
                const state = v4();

                this.createServer(state);

                vscode.env.openExternal(vscode.Uri.parse(`https://id.twitch.tv/oauth2/authorize?client_id=tfpzooo7e9k9cemriutxt6es43jw7m` +
                    `&redirect_uri=http://localhost:5544` +
                    `&response_type=token&scope=chat:edit chat:read user:read:email` +
                    `&state=${state}`));
            }
        }
    }


    public handleSignOut() {
        if (keytar) {
            keytar.deletePassword(service, account);
        }
        vscode.window.showInformationMessage('Signing out');
    }

    public async currentUser() {
        if (keytar) {
            var accessToken = await keytar.getPassword(service, account);
            var userDetails = await this.getUserDetails(accessToken);
            return { ...userDetails, accessToken };
        }
    }

    private async getUserDetails(token: string | null) {
        const url = 'https://api.twitch.tv/helix/users';
        const res = await fetch.default(url, { headers: { 'Authorization': `Bearer ${token}` } });
        const json = (await res.json());
        return json.data && json.data[0];
    }

    private createServer(state: string) {

        const file = readFileSync(path.join(__dirname, '/login/index.html'));

        const server = http.createServer((req, res) => {
            const mReq = url.parse(req.url!, true);
            var mReqPath = mReq.pathname;

            if (mReqPath === '/') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(file);
            } else if (mReqPath === '/oauth') {
                const q: any = mReq.query;
                if (keytar) {
                    if (q.state === state) {
                        keytar.setPassword(service, account, q.access_token);
                        this.emit('SignInSuccess');
                    } else {
                        vscode.window.showErrorMessage("Error while logging in. State mismatch error");
                        this.emit('SignInError');
                    }
                }
                res.writeHead(200);
                res.end(file);
            } else if (mReqPath === '/favicon.ico') {
                res.writeHead(204);
                res.end();
            }
        });

        server.listen('5544', (err: any) => {
            console.error(err);
        });
    }
}