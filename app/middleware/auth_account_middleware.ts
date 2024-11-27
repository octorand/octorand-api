import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import { appKey } from '#config/app';
import UnauthorizedException from '#exceptions/unauthorized_exception';
import UnprocessableException from '#exceptions/unprocessable_exception';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class AuthAccountMiddleware {
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

    // Stop if token is not found
    if (!token) {
      throw new UnprocessableException('Missing authorization header');
    }

    // Strip bearer section
    token = token.replace('Bearer ', '');

    // Validate token
    try {
      const secret = appKey.valueOf();
      const decoded = jwt.verify(token, secret) as JwtPayload;

      // Read token parameters
      const id = decoded.id;
      const address = decoded.address;

      // Add account details to request
      ctx.request.all()['account_id'] = id;
      ctx.request.all()['account_address'] = address;
    } catch (err) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    // Continue request
    await next();
  }
}