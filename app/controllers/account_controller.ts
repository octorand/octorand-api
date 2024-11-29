import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { rankingsValidator } from '#validators/account_validator';
import AccountService from '#services/account_service';

@inject()
export default class AccountController {
  /**
   * Initialise controller
   *
   * @param accountService
   */
  constructor(
    private accountService: AccountService
  ) { }

  /**
   * Read account rankings
   *
   * @param context
   * @returns
   */
  async rankings(context: HttpContext) {
    // Validate request
    await context.request.validateUsing(rankingsValidator);

    // Read rankings
    const rankings = await this.accountService.readRankings();

    // Prepare response
    const response = rankings;

    return response;
  }
}
