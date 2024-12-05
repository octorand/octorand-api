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
import { processValidator } from '#validators/redeem_validator';
import RedeemService from '#services/redeem_service';
let RedeemController = class RedeemController {
    redeemService;
    constructor(redeemService) {
        this.redeemService = redeemService;
    }
    async process(context) {
        const payload = await context.request.validateUsing(processValidator);
        const redeem = await this.redeemService.processAction(payload.account_id, payload.prime_generation, payload.prime_position, payload.stars, payload.action);
        const response = redeem.serialize({
            fields: {
                pick: ['id', 'account_id', 'prime_id', 'stars', 'action', 'data'],
            },
        });
        return response;
    }
};
RedeemController = __decorate([
    inject(),
    __metadata("design:paramtypes", [RedeemService])
], RedeemController);
export default RedeemController;
//# sourceMappingURL=redeem_controller.js.map