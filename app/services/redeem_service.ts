import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';
import Prime from '#models/prime';
import Redeem from '#models/redeem';

@inject()
export default class RedeemService {

  /**
   * Process action
   * 
   * @returns
   */
  async processAction(account_id: number, prime_generation: number, prime_position: number, stars: number, action: string): Promise<Redeem> {
    // Find prime
    let prime = await Prime.query()
      .where('generation', prime_generation)
      .where('position', prime_position)
      .first();

    // Verify prime
    if (!prime) {
      throw new UnprocessableException('Invalid prime');
    }

    // Find account
    let account = await Account.find(account_id);

    // Verify account
    if (!account) {
      throw new UnprocessableException('Invalid account');
    }

    // Make sure stars balance is enough
    if (account.stars < stars) {
      throw new UnprocessableException('Not enough stars');
    }

    // Process redeem request
    if (action === 'score') {
      // Update prime score
      prime.score = prime.score + Math.floor(stars);
      await prime.save();
    }

    // Insert redeem record
    let redeem = new Redeem();
    redeem.account_id = account.id;
    redeem.prime_id = prime.id;
    redeem.stars = stars;
    redeem.action = action;
    await redeem.save();

    // Update account stars
    account.stars = account.stars - stars;
    await account.save();

    return redeem;
  }
}
