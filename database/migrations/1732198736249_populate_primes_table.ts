import db from '@adonisjs/lucid/services/db';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  /**
   * Name of table
   */
  protected tableName = 'primes';

  /**
   * Roll forward
   */
  async up() {
    for (let i = 0; i < 1000; i++) {
      await db.table(this.tableName).insert({
        'generation': 1,
        'position': i,
        'score': 0
      });
    }

    for (let i = 0; i < 8000; i++) {
      await db.table(this.tableName).insert({
        'generation': 2,
        'position': i,
        'score': 0
      });
    }
  }

  /**
   * Roll back
   */
  async down() {
    this.schema.dropTable(this.tableName);
  }
}
