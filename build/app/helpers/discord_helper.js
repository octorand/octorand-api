import env from '#start/env';
import { Client, GatewayIntentBits } from 'discord.js';
export default class DiscordHelper {
    discord_client;
    constructor() {
        this.discord_client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.discord_client.on('ready', () => {
            console.log('Logged in');
        });
        this.discord_client.login(env.get('DISCORD_TOKEN'));
    }
    send(message) {
        try {
            let enabled = env.get('DISCORD_ENABLED');
            if (enabled) {
                let channel = this.discord_client.channels.cache.get(env.get('DISCORD_CHANNEL'));
                channel.send(message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=discord_helper.js.map