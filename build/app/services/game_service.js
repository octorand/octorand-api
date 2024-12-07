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
import Account from '#models/account';
import AlphaRoller from '../games/alpha_roller.js';
import SpellSeeker from '../games/spell_seeker.js';
let GameService = class GameService {
    alphaRoller;
    spellSeeker;
    constructor(alphaRoller, spellSeeker) {
        this.alphaRoller = alphaRoller;
        this.spellSeeker = spellSeeker;
    }
    async loadGameStatus(account_id, game) {
        let account = await Account.find(account_id);
        if (!account) {
            throw new UnprocessableException('Invalid account');
        }
        let response = {};
        switch (game) {
            case 'alpha-roller':
                response = await this.alphaRoller.loadGameStatus(account);
                break;
            case 'spell-seeker':
                response = await this.spellSeeker.loadGameStatus(account);
                break;
        }
        return response;
    }
    async processGameAction(account_id, game, action, data) {
        let account = await Account.find(account_id);
        if (!account) {
            throw new UnprocessableException('Invalid account');
        }
        let response = {};
        switch (game) {
            case 'alpha-roller':
                response = await this.alphaRoller.processGameAction(account, action, data);
                break;
            case 'spell-seeker':
                response = await this.spellSeeker.processGameAction(account, action, data);
                break;
        }
        return response;
    }
};
GameService = __decorate([
    inject(),
    __metadata("design:paramtypes", [AlphaRoller,
        SpellSeeker])
], GameService);
export default GameService;
//# sourceMappingURL=game_service.js.map