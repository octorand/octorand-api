import { Exception } from '@adonisjs/core/exceptions'

export default class UnprocessableException extends Exception {
  /**
   * Exception status code
   */
  static status = 422;

  /**
   * Exception identifier
   */
  static code = 'E_HTTP_EXCEPTION';
}