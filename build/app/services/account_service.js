var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from '@adonisjs/core';
import db from '@adonisjs/lucid/services/db';
import Account from '#models/account';
let AccountService = class AccountService {
    async updateRankings() {
        const query = `
      UPDATE accounts AS a
        INNER JOIN (SELECT id, ROW_NUMBER() OVER(ORDER BY total DESC) AS position FROM accounts) AS r
          ON a.id = r.id
      SET a.ranking = r.position
    `;
        await db.rawQuery(query);
    }
    async readRankings() {
        return await Account.query()
            .orderBy('ranking', 'asc')
            .exec();
    }
};
AccountService = __decorate([
    inject()
], AccountService);
export default AccountService;
//# sourceMappingURL=account_service.js.map