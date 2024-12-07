import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'game_alpha_rollers';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').unsigned().references('accounts.id').notNullable();
            table.string('word', 16).notNullable();
            table.string('pattern', 16).notNullable();
            table.string('reveal', 16).notNullable();
            table.string('inputs', 16).notNullable();
            table.string('results', 16).notNullable();
            table.integer('rounds').notNullable();
            table.integer('hits').notNullable();
            table.boolean('started').notNullable();
            table.boolean('ended').notNullable();
            table.boolean('boost_1').notNullable();
            table.boolean('boost_2').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0008_create_game_alpha_rollers_table.js.map