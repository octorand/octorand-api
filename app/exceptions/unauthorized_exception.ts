import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  /**
   * Exception status code
   */
  static status = 401;

  /**
   * Exception identifier
   */
  static code = 'E_UNAUTHORIZED_ACCESS';
}