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
import { loadValidator, processValidator } from '#validators/game_validator';
import GameService from '#services/game_service';
let GameController = class GameController {
    gameService;
    constructor(gameService) {
        this.gameService = gameService;
    }
    async load(context) {
        const payload = await context.request.validateUsing(loadValidator);
        const status = this.gameService.loadGameStatus(payload.account_id, payload.game);
        const response = status;
        return response;
    }
    async process(context) {
        const payload = await context.request.validateUsing(processValidator);
        const status = this.gameService.processGameAction(payload.account_id, payload.game, payload.action, payload.data);
        const response = status;
        return response;
    }
};
GameController = __decorate([
    inject(),
    __metadata("design:paramtypes", [GameService])
], GameController);
export default GameController;
//# sourceMappingURL=game_controller.js.map