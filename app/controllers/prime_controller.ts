import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { allValidator } from '#validators/prime_validator';
import PrimeService from '#services/prime_service';

@inject()
export default class PrimeController {
  /**
   * Initialise controller
   *
   * @param primeService
   */
  constructor(
    private primeService: PrimeService
  ) { }

  /**
   * Read all primes
   *
   * @param context
   * @returns
   */
  async all(context: HttpContext) {
    // Validate request
    await context.request.validateUsing(allValidator);

    // Read primes
    const primes = await this.primeService.readUpdated();

    // Prepare response
    const response = primes;

    return response;
  }
}
