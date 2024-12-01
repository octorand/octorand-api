import { BaseModel, column, hasMany, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Redeem from './redeem.js';

export default class Prime extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Prime id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Prime generation
   */
  @column()
  declare generation: number;

  /**
   * Prime position
   */
  @column()
  declare position: number;

  /**
   * Prime score
   */
  @column()
  declare score: number;

  /**
   * List of redeems belongs to prime
   */
  @hasMany(() => Redeem, { foreignKey: 'redeem_id' })
  declare redeems: HasMany<typeof Redeem>;
}
