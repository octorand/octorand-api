import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import UnprocessableException from '#exceptions/unprocessable_exception';

export default class AuthGuestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Read account parameters
    const account_id = ctx.request.input('account_id');
    const account_address = ctx.request.input('account_address');

    // Stop if account parameters present
    if (account_id || account_address) {
      throw new UnprocessableException('Invalid account parameters');
    }

    // Read token
    let token = ctx.request.header('authorization');

    // Stop if token is found
    if (token) {
      throw new UnprocessableException('Invalid authorization header');
    }

    // Continue request
    await next();
  }
}