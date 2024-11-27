import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import { appKey } from '#config/app';
import Account from '#models/account';
import UnprocessableException from '#exceptions/unprocessable_exception';
import UnauthorizedException from '#exceptions/unauthorized_exception';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
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

      // Fetch account details
      let account = await Account.query().where('address', address).where('id', id).first();

      // Make sure account exists
      if (!account) {
        throw new UnauthorizedException('Invalid authorization token');
      }

      // Add account to context

    } catch (err) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    // Continue request
    await next();
  }
}