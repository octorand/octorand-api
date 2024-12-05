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
import { allValidator } from '#validators/prime_validator';
import PrimeService from '#services/prime_service';
let PrimeController = class PrimeController {
    primeService;
    constructor(primeService) {
        this.primeService = primeService;
    }
    async all(context) {
        await context.request.validateUsing(allValidator);
        const primes = await this.primeService.readAll();
        const response = primes;
        return response;
    }
};
PrimeController = __decorate([
    inject(),
    __metadata("design:paramtypes", [PrimeService])
], PrimeController);
export default PrimeController;
//# sourceMappingURL=prime_controller.js.map