import DiscordHelper from '#helpers/discord_helper';
export default class DiscordProvider {
    app;
    constructor(app) {
        this.app = app;
    }
    register() {
    }
    async boot() {
    }
    async start() {
    }
    async ready() {
        this.app.container.singleton(DiscordHelper, async () => {
            return new DiscordHelper();
        });
        await this.app.container.make(DiscordHelper);
    }
    async shutdown() {
    }
}
//# sourceMappingURL=discord_provider.js.map