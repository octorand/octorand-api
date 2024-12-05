import UnprocessableException from '#exceptions/unprocessable_exception';
export default class AuthGuestMiddleware {
    async handle(ctx, next) {
        const account_id = ctx.request.input('account_id');
        const account_address = ctx.request.input('account_address');
        if (account_id || account_address) {
            throw new UnprocessableException('Invalid account parameters');
        }
        let token = ctx.request.header('authorization');
        if (token) {
            throw new UnprocessableException('Invalid authorization header');
        }
        await next();
    }
}
//# sourceMappingURL=auth_guest_middleware.js.map