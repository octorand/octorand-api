import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { indexValidator } from '#validators/account_validator';
import AccountService from '#services/account_service';

@inject()
export default class AccountController {
  /**
   * Initialise controller
   *
   * @param accountService
   */
  constructor(private accountService: AccountService) { }

  /**
   * Read current account details
   *
   * @param context
   * @returns
   */
  async index(context: HttpContext) {
    const payload = await context.request.validateUsing(indexValidator);
    return this.accountService.read(1);
  }
}
