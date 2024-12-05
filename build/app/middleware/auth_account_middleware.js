import { appKey } from '#config/app';
import UnauthorizedException from '#exceptions/unauthorized_exception';
import UnprocessableException from '#exceptions/unprocessable_exception';
import jwt from 'jsonwebtoken';
export default class AuthAccountMiddleware {
    async handle(ctx, next) {
        const account_id = ctx.request.input('account_id');
        const account_address = ctx.request.input('account_address');
        if (account_id || account_address) {
            throw new UnprocessableException('Invalid account parameters');
        }
        let token = ctx.request.header('authorization');
        if (!token) {
            throw new UnprocessableException('Missing authorization header');
        }
        token = token.replace('Bearer ', '');
        try {
            const secret = appKey.valueOf();
            const decoded = jwt.verify(token, secret);
            const id = decoded.id;
            const address = decoded.address;
            ctx.request.all()['account_id'] = id;
            ctx.request.all()['account_address'] = address;
        }
        catch (err) {
            throw new UnauthorizedException('Invalid authorization token');
        }
        await next();
    }
}
//# sourceMappingURL=auth_account_middleware.js.map