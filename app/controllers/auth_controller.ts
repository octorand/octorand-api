import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { setupValidator, verifyValidator } from '#validators/auth_validator';
import AuthService from '#services/auth_service';

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  setup(context: HttpContext) {
    context.request.validateUsing(setupValidator);
    return this.authService.setup();
  }

  verify(context: HttpContext) {
    const payload = context.request.validateUsing(verifyValidator);
    return this.authService.verify(payload);
  }
}
