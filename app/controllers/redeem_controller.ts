import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { processValidator } from '#validators/redeem_validator';
import RedeemService from '#services/redeem_service';

@inject()
export default class RedeemController {
  /**
   * Initialise controller
   *
   * @param redeemService
   */
  constructor(
    private redeemService: RedeemService
  ) { }

  /**
   * Process redeem stars action
   *
   * @param context
   * @returns
   */
  async process(context: HttpContext) {
    // Validate request
    const payload = await context.request.validateUsing(processValidator);

    // Process action
    await this.redeemService.processAction(payload.account_id, payload.prime_generation, payload.prime_position, payload.stars, payload.action);

    // Prepare response
    const response = {};

    return response;
  }
}
