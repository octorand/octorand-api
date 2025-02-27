import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class Deposit extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Deposit id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Deposit account id
   */
  @column()
  declare account_id: number | null;

  /**
   * Deposit transaction id
   */
  @column()
  declare transaction_id: string;

  /**
   * Deposit block round
   */
  @column()
  declare round: number;

  /**
   * Amount deposited
   */
  @column()
  declare amount: number;

  /**
   * Deposit creation timestamp
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  /**
   * Deposit updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  /**
   * Account that deposit belongs to
   */
  @belongsTo(() => Account, { foreignKey: 'account_id' })
  declare account: BelongsTo<typeof Account>;
}
