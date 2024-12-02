import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import GameSpellSeeker from '../games/spell-seeker/index.js';
import Account from '#models/account';

@inject()
export default class GameService {
  /**
   * Initialise service
   *
   * @param gameSpellSeeker
   */
  constructor(
    private gameSpellSeeker: GameSpellSeeker
  ) { }

  /**
   * Load game status
   * 
   * @returns
   */
  async loadGameStatus(account_id: number, game: string): Promise<any> {
    // Find account
    let account = await Account.find(account_id);

    // Verify account
    if (!account) {
      throw new UnprocessableException('Invalid account');
    }

    // Define response
    let response = {};

    // Load game status
    switch (game) {
      case 'spell-seeker':
        response = await this.gameSpellSeeker.loadGameStatus(account);
        break;
    }

    return response;
  }

  /**
   * Process game action
   * 
   * @returns
   */
  async processGameAction(account_id: number, game: string, action: string, data: any): Promise<any> {
    // Find account
    let account = await Account.find(account_id);

    // Verify account
    if (!account) {
      throw new UnprocessableException('Invalid account');
    }

    // Define response
    let response = {};

    // Process game action
    switch (game) {
      case 'spell-seeker':
        response = await this.gameSpellSeeker.processGameAction(account, action, data);
        break;
    }

    return response;
  }
}
