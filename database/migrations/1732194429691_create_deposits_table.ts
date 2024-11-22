import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  /**
   * Name of table
   */
  protected tableName = 'deposits';

  /**
   * Roll forward
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('transaction_id', 96).unique();
      table.string('sender', 96);
      table.integer('amount');
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
