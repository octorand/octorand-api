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
import { rankingsValidator } from '#validators/account_validator';
import AccountService from '#services/account_service';
let AccountController = class AccountController {
    accountService;
    constructor(accountService) {
        this.accountService = accountService;
    }
    async rankings(context) {
        await context.request.validateUsing(rankingsValidator);
        await this.accountService.updateRankings();
        const rankings = await this.accountService.readRankings();
        const response = rankings;
        return response;
    }
};
AccountController = __decorate([
    inject(),
    __metadata("design:paramtypes", [AccountService])
], AccountController);
export default AccountController;
//# sourceMappingURL=account_controller.js.map