import { Exception } from '@adonisjs/core/exceptions';
export default class UnauthorizedException extends Exception {
    static status = 401;
    static code = 'E_UNAUTHORIZED_ACCESS';
}
//# sourceMappingURL=unauthorized_exception.js.map