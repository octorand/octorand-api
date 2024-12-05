import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'devices';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').unsigned().references('accounts.id').nullable();
            table.string('private_key', 48).notNullable().unique();
            table.string('public_key', 48).notNullable().unique();
            table.string('transaction_id').nullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0002_create_devices_table.js.map