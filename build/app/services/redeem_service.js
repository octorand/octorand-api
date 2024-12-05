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
import UnprocessableException from '#exceptions/unprocessable_exception';
import IdentityHelper from '#helpers/identity_helper';
import DiscordHelper from '#helpers/discord_helper';
import Account from '#models/account';
import Prime from '#models/prime';
import Redeem from '#models/redeem';
let RedeemService = class RedeemService {
    discordHelper;
    identityHelper;
    constructor(discordHelper, identityHelper) {
        this.discordHelper = discordHelper;
        this.identityHelper = identityHelper;
    }
    async processAction(account_id, prime_generation, prime_position, stars, action) {
        let prime = await Prime.query()
            .where('generation', prime_generation)
            .where('position', prime_position)
            .first();
        if (!prime) {
            throw new UnprocessableException('Invalid prime');
        }
        let account = await Account.find(account_id);
        if (!account) {
            throw new UnprocessableException('Invalid account');
        }
        if (account.stars < stars) {
            throw new UnprocessableException('Not enough stars');
        }
        if (action === 'score') {
            prime.score = prime.score + Math.floor(stars);
            await prime.save();
        }
        let redeem = new Redeem();
        redeem.account_id = account.id;
        redeem.prime_id = prime.id;
        redeem.stars = stars;
        redeem.action = action;
        await redeem.save();
        account.stars = account.stars - stars;
        await account.save();
        let name = await this.identityHelper.findName(account.address);
        this.discordHelper.send(name + ' redeemed ' + stars + ' stars :star:');
        return redeem;
    }
};
RedeemService = __decorate([
    inject(),
    __metadata("design:paramtypes", [DiscordHelper,
        IdentityHelper])
], RedeemService);
export default RedeemService;
//# sourceMappingURL=redeem_service.js.map