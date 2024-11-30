import { inject } from '@adonisjs/core';
import db from '@adonisjs/lucid/services/db';
import Account from '#models/account';

@inject()
export default class AccountService {

  /**
   * Update rankings
   *
   * @returns
   */
  async updateRankings() {
    // Update account ranking
    const query = `
      UPDATE accounts AS a
        INNER JOIN (SELECT id, ROW_NUMBER() OVER(ORDER BY total DESC) AS position FROM accounts) AS r
          ON a.id = r.id
      SET a.ranking = r.position
    `;

    await db.rawQuery(query);
  }

  /**
   * Read rankings
   * 
   * @returns
   */
  async readRankings(): Promise<Account[]> {
    return await Account.query()
      .orderBy('ranking', 'asc')
      .exec();
  }
}
