import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { syncValidator } from '#validators/deposit_validator';
import DepositService from '#services/deposit_service';

@inject()
export default class DepositController {
  /**
   * Initialise controller
   *
   * @param depositService
   */
  constructor(
    private depositService: DepositService
  ) { }

  /**
   * Setup authentication parameters
   *
   * @param context
   * @returns
   */
  async sync(context: HttpContext) {
    // Validate request
    await context.request.validateUsing(syncValidator);

    // Sync deposits
    await this.depositService.syncDeposits();

    // Prepare response
    const response = {};

    return response;
  }
}
