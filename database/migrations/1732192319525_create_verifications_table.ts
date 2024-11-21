import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'verifications';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('transaction_id', 96);
      table.string('sender', 96);
      table.string('code', 36);
      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
