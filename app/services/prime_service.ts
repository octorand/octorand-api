import { inject } from '@adonisjs/core';
import Prime from '#models/prime';

@inject()
export default class PrimeService {

  /**
   * Read primes
   * 
   * @returns
   */
  async readAll(): Promise<Prime[]> {
    return await Prime.all();
  }
}
