import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import GameSpellSeekerHelper from '#helpers/game_spell_seeker_helper';
import Account from '#models/account';

@inject()
export default class GameService {
  /**
   * Initialise service
   *
   * @param gameSpellSeekerHelper
   */
  constructor(
    private gameSpellSeekerHelper: GameSpellSeekerHelper
  ) { }

  /**
   * Load game status
   * 
   * @param account_id
   * @param game
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
        response = await this.gameSpellSeekerHelper.loadGameStatus(account);
        break;
    }

    return response;
  }

  /**
   * Process game action
   * 
   * @param account_id
   * @param game
   * @param action
   * @param data
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
        response = await this.gameSpellSeekerHelper.processGameAction(account, action, data);
        break;
    }

    return response;
  }
}
