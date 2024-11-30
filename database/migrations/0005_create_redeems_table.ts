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
      table.integer('account_id').unsigned().references('accounts.id').notNullable();
      table.integer('prime_id').unsigned().references('primes.id').notNullable();
      table.integer('stars').notNullable();
      table.string('action', 24).notNullable();
      table.string('data', 256).notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }

  /**
   * Roll back
   */
  async down() {
    this.schema.dropTable(this.tableName);
  }
}
