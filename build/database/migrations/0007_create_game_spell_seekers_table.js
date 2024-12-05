import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'game_spell_seekers';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').unsigned().references('accounts.id').notNullable();
            table.string('word', 8).notNullable();
            table.string('reveal', 8).notNullable();
            table.string('allowed', 26).notNullable();
            table.boolean('started').notNullable();
            table.boolean('ended').notNullable();
            table.boolean('boost_1').notNullable();
            table.boolean('boost_2').notNullable();
            table.integer('guesses').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0007_create_game_spell_seekers_table.js.map