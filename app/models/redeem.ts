import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';
import Prime from './prime.js';

export default class Redeem extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Redeem id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Redeem account id
   */
  @column()
  declare account_id: number | null;

  /**
   * Redeem prime id
   */
  @column()
  declare prime_id: number | null;

  /**
   * Redeem stars
   */
  @column()
  declare stars: number;

  /**
   * Redeem action
   */
  @column()
  declare action: string;

  /**
   * Redeem creation timestamp
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  /**
   * Redeem updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  /**
   * Account that redeem belongs to
   */
  @belongsTo(() => Account, { foreignKey: 'account_id' })
  declare account: BelongsTo<typeof Account>;

  /**
   * Prime that redeem belongs to
   */
  @belongsTo(() => Prime, { foreignKey: 'prime_id' })
  declare prime: BelongsTo<typeof Prime>;
}
