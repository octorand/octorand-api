import { Exception } from '@adonisjs/core/exceptions';
export default class UnprocessableException extends Exception {
    static status = 422;
    static code = 'E_HTTP_EXCEPTION';
}
//# sourceMappingURL=unprocessable_exception.js.map