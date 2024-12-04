import type { ApplicationService } from '@adonisjs/core/types'
import DiscordHelper from '#helpers/discord_helper';

export default class DiscordProvider {

  constructor(protected app: ApplicationService) { }

  /**
   * Register bindings to the container
   */
  register() {
  }

  /**
   * The container bindings have booted
   */
  async boot() {
  }

  /**
   * The application has been booted
   */
  async start() {
  }

  /**
   * The process has been started
   */
  async ready() {
    this.app.container.singleton(DiscordHelper, async () => {
      return new DiscordHelper();
    });

    await this.app.container.make(DiscordHelper);
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
  }
}