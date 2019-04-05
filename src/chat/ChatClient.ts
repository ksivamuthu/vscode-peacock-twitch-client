import { Client, Options, Userstate } from 'tmi.js';
import { Peacock } from '../commands/Peacock';
import { disconnect } from 'cluster';
import { EventEmitter } from 'vscode';
import { TwitchClientStatus } from '../Enum';

export default class ChatClient {
    private _client: Client | null;
    private readonly _peacock: Peacock;

    private chatClientStatusEventEmitter = new EventEmitter<TwitchClientStatus>();
    public onStatusChanged = this.chatClientStatusEventEmitter.event;

    constructor() {
        this._client = null;
        this._peacock = new Peacock();
    }

    public async connect(options: Options): Promise<[string, number]> {
        await disconnect();
        this._client = Client(options);
        this._client.on('connected', this.onConnectedHandler.bind(this));
        this._client.on('message', this.onMessageHandler.bind(this));
        const status = await this._client.connect();
        this.chatClientStatusEventEmitter.fire(TwitchClientStatus.chatConnected);
        return status;
    }

    public async disconnect() {
        if (this._client) {
            this._client.disconnect();
            this.chatClientStatusEventEmitter.fire(TwitchClientStatus.chatDisconnected);
            this._client = null;
        }
    }

    public isConnected(): boolean {
        return this._client ? this._client.readyState() === "OPEN" : false;
    }

    private onConnectedHandler(address: string, port: number) {
        console.log(`Connected chat client ${address} : ${port}`);
    }

    private async onMessageHandler(channel: string, userState: Userstate, message: string, self: boolean) {
        console.log(`Received ${message} from ${userState["user-id"]}`);
        if (self) { return; }
        if (!message) { return; }

        if (message.startsWith('!peacock')) {
            await this._peacock.handleCommands('!peacock', message.replace('!peacock', '').trim());
        }
    }
}