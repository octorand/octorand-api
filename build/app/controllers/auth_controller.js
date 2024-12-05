var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from '@adonisjs/core';
import { accountValidator, setupValidator, verifyValidator } from '#validators/auth_validator';
import AccountService from '#services/account_service';
import AuthService from '#services/auth_service';
let AuthController = class AuthController {
    accountService;
    authService;
    constructor(accountService, authService) {
        this.accountService = accountService;
        this.authService = authService;
    }
    async setup(context) {
        await context.request.validateUsing(setupValidator);
        const device = await this.authService.setupDevice();
        const response = device.serialize({
            fields: {
                pick: ['private_key', 'public_key'],
            },
        });
        return response;
    }
    async verify(context) {
        const payload = await context.request.validateUsing(verifyValidator);
        const token = await this.authService.verifyDevice(payload.private_key, payload.transaction_id);
        await this.accountService.updateRankings();
        const response = {
            token: token
        };
        return response;
    }
    async account(context) {
        const payload = await context.request.validateUsing(accountValidator);
        const account = await this.authService.getCurrentAccount(payload.account_id, payload.account_address);
        const response = account.serialize({
            fields: {
                pick: ['id', 'address', 'hearts', 'stars', 'total', 'ranking'],
            },
        });
        return response;
    }
};
AuthController = __decorate([
    inject(),
    __metadata("design:paramtypes", [AccountService,
        AuthService])
], AuthController);
export default AuthController;
//# sourceMappingURL=auth_controller.js.map