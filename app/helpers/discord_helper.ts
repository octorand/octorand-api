import env from '#start/env';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

export default class DiscordHelper {

    /**
     * Discord client
     */
    private discord_client: Client;

    /**
     * Construct component
     */
    constructor() {
        // Create client
        this.discord_client = new Client({ intents: [GatewayIntentBits.Guilds] });

        // Connect client
        this.discord_client.on('ready', () => {
            console.log('Logged in');
        });

        // Login client
        this.discord_client.login(env.get('DISCORD_TOKEN'));
    }

    /**
     * Send a message to channel
     * 
     * @param message 
     */
    send(message: string) {
        try {
            // Send message to channel
            let channel = (this.discord_client.channels.cache.get(env.get('DISCORD_CHANNEL')) as TextChannel);
            channel.send(message);
        } catch (error) {
            console.log('Failed to send discord message');
        }
    }
}
