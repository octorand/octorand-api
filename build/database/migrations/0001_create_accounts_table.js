import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'accounts';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('address', 96).notNullable().unique();
            table.integer('hearts').notNullable();
            table.integer('stars').notNullable();
            table.integer('total').notNullable();
            table.integer('ranking').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0001_create_accounts_table.js.map