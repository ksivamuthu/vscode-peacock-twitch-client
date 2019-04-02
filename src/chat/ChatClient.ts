import { Client, Options, Userstate } from 'tmi.js';
import { Peacock } from '../commands/Peacock';

export default class ChatClient {
    private readonly _client: Client;
    private readonly _peacock: Peacock;

    constructor(options: Options) {
        this._client = Client(options);
        this._client.on('connected', this.onConnectedHandler.bind(this));
        this._client.on('message', this.onMessageHandler.bind(this));

        this._peacock = new Peacock();
    }

    public connect(): Promise<[string, number]> {
        return this._client.connect();
    }

    public disconnect(): Promise<[string, number]> {
        return this._client.disconnect();
    }

    public activate() {
        this._client.connect();
    }

    public deactivate() {
        this._client.disconnect();
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