import { Client, Options, Userstate } from 'tmi.js';
import { PeacockCommands } from '../commands/PeacockCommands';

export default class ChatClient {
    private readonly _client: Client;
    constructor(options: Options) {
        this._client = Client(options);
        this._client.on('connected', this.onConnectedHandler);
        this._client.on('message', this.onMessageHandler);
    }

    public connect(): Promise<[string, number]> {
        return this._client.connect();
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
            const peacockCommand = new PeacockCommands();
            await peacockCommand.handleCommands('!peacock', message.replace('!peacock', '').trim());
        }
    }
}