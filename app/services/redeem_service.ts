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
    let prime = await Prime.query().where('generation', prime_generation).where('position', prime_position).first();

    // Verify prime
    if (!prime) {
      throw new UnprocessableException('Invalid prime');
    }

    // Find account
    let account = await Account.query().where('id', account_id).first();

    // Verify account
    if (!account) {
      throw new UnprocessableException('Invalid account');
    }

    // Insert redeem record
    let redeem = new Redeem();
    redeem.stars = stars;
    redeem.action = action;
    redeem.data = '';
    await redeem.save();

    // Assign redeem to account
    await redeem.related('account').associate(account);

    // Assign redeem to prime
    await redeem.related('prime').associate(prime);

    return redeem;
  }
}
