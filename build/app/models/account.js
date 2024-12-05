var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import Deposit from './deposit.js';
import Device from './device.js';
import Redeem from './redeem.js';
export default class Account extends BaseModel {
    static namingStrategy = new SnakeCaseNamingStrategy();
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Account.prototype, "address", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Account.prototype, "hearts", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Account.prototype, "stars", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Account.prototype, "total", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Account.prototype, "ranking", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Account.prototype, "created_at", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Account.prototype, "updated_at", void 0);
__decorate([
    hasMany(() => Deposit, { foreignKey: 'account_id' }),
    __metadata("design:type", Object)
], Account.prototype, "deposits", void 0);
__decorate([
    hasMany(() => Device, { foreignKey: 'account_id' }),
    __metadata("design:type", Object)
], Account.prototype, "devices", void 0);
__decorate([
    hasMany(() => Redeem, { foreignKey: 'redeem_id' }),
    __metadata("design:type", Object)
], Account.prototype, "redeems", void 0);
//# sourceMappingURL=account.js.map