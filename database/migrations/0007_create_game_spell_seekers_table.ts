import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  /**
   * Name of table
   */
  protected tableName = 'game_spell_seekers';

  /**
   * Roll forward
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('account_id').unsigned().references('accounts.id').notNullable();
      table.string('word', 8).notNullable();
      table.string('reveal', 8).notNullable();
      table.string('allowed', 26).notNullable();
      table.integer('guesses').notNullable();
      table.boolean('started').notNullable();
      table.boolean('ended').notNullable();
      table.boolean('boost_1').notNullable();
      table.boolean('boost_2').notNullable();
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
