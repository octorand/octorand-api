import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'primes';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('generation').notNullable();
            table.integer('position').notNullable();
            table.integer('score').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=0004_create_primes_table.js.map