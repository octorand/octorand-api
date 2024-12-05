import { inject } from '@adonisjs/core';
import Prime from '#models/prime';

@inject()
export default class PrimeService {

  /**
   * Read primes
   * 
   * @returns
   */
  async readUpdated(): Promise<Prime[]> {
    return await Prime.query()
      .where('score', '>', 0)
      .exec();
  }
}
