import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { setupValidator, verifyValidator } from '#validators/auth_validator';
import AuthService from '#services/auth_service';

@inject()
export default class AuthController {
  /**
   * Initialise controller
   *
   * @param authService
   */
  constructor(private authService: AuthService) {}

  /**
   * Setup authentication parameters
   *
   * @param context
   * @returns
   */
  setup(context: HttpContext) {
    context.request.validateUsing(setupValidator);
    return this.authService.setup();
  }

  /**
   * Verify authentication parameters
   *
   * @param context
   * @returns
   */
  verify(context: HttpContext) {
    const payload = context.request.validateUsing(verifyValidator);
    return this.authService.verify(payload);
  }
}
