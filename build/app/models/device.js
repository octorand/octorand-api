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
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import Account from './account.js';
export default class Device extends BaseModel {
    static namingStrategy = new SnakeCaseNamingStrategy();
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Device.prototype, "account_id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Device.prototype, "private_key", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Device.prototype, "public_key", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Device.prototype, "transaction_id", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Device.prototype, "created_at", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Device.prototype, "updated_at", void 0);
__decorate([
    belongsTo(() => Account, { foreignKey: 'account_id' }),
    __metadata("design:type", Object)
], Device.prototype, "account", void 0);
//# sourceMappingURL=device.js.map