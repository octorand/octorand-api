import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  /**
   * Name of table
   */
  protected tableName = 'redeems';

  /**
   * Roll forward
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('account_id').unsigned().references('accounts.id').nullable();
      table.integer('prime_id').unsigned().references('primes.id').nullable();
      table.integer('stars');
      table.string('action', 24);
      table.string('data', 256);
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
