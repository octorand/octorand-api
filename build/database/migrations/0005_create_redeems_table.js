import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'redeems';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').unsigned().references('accounts.id').notNullable();
            table.integer('prime_id').unsigned().references('primes.id').notNullable();
            table.integer('stars').notNullable();
            table.string('action', 24).notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0005_create_redeems_table.js.map