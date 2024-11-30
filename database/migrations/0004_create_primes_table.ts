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
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('generation');
      table.integer('position');
      table.integer('score');
      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  /**
   * Roll back
   */
  async down() {
    this.schema.dropTable(this.tableName);
  }
}
