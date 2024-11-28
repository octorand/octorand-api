import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { accountValidator, setupValidator, verifyValidator } from '#validators/auth_validator';
import AuthService from '#services/auth_service';

@inject()
export default class AuthController {
  /**
   * Initialise controller
   *
   * @param authService
   */
  constructor(private authService: AuthService) { }

  /**
   * Setup authentication parameters
   *
   * @param context
   * @returns
   */
  async setup(context: HttpContext) {
    // Validate request
    await context.request.validateUsing(setupValidator);

    // Setup new device
    const device = await this.authService.setupDevice();

    // Prepare response
    const response = device.serialize({
      fields: {
        pick: ['private_key', 'public_key'],
      },
    });

    return response;
  }

  /**
   * Verify authentication parameters
   *
   * @param context
   * @returns
   */
  async verify(context: HttpContext) {
    // Validate request
    const payload = await context.request.validateUsing(verifyValidator);

    // Verify device parameters
    const token = await this.authService.verifyDevice(payload.private_key, payload.transaction_id);

    // Prepare response
    const response = {
      token: token
    };

    return response;
  }

  /**
   * Get current account details
   *
   * @param context
   * @returns
   */
  async account(context: HttpContext) {
    // Validate request
    const payload = await context.request.validateUsing(accountValidator);

    // Read account details
    const account = await this.authService.getCurrentAccount(payload.account_id, payload.account_address);

    // Prepare response
    const response = account.serialize({
      fields: {
        pick: ['id', 'address', 'hearts', 'stars', 'ranking'],
      },
    });

    return response;
  }
}
