import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';
import AlphaRoller from '../games/alpha_roller.js';
import SpellSeeker from '../games/spell_seeker.js';

@inject()
export default class GameService {
  /**
   * Initialise service
   *
   * @param alphaRoller
   * @param spellSeeker
   */
  constructor(
    private alphaRoller: AlphaRoller,
    private spellSeeker: SpellSeeker
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
      case 'alpha-roller':
        response = await this.alphaRoller.loadGameStatus(account);
        break;
      case 'spell-seeker':
        response = await this.spellSeeker.loadGameStatus(account);
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
      case 'alpha-roller':
        response = await this.alphaRoller.processGameAction(account, action, data);
        break;
      case 'spell-seeker':
        response = await this.spellSeeker.processGameAction(account, action, data);
        break;
    }

    return response;
  }
}
