var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, hasMany, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import Redeem from './redeem.js';
export default class Prime extends BaseModel {
    static namingStrategy = new SnakeCaseNamingStrategy();
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Prime.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Prime.prototype, "generation", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Prime.prototype, "position", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Prime.prototype, "score", void 0);
__decorate([
    hasMany(() => Redeem, { foreignKey: 'redeem_id' }),
    __metadata("design:type", Object)
], Prime.prototype, "redeems", void 0);
//# sourceMappingURL=prime.js.map