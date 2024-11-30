import { DateTime } from 'luxon';
import { BaseModel, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';

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
   * Sender of deposit
   */
  @column()
  declare sender: string;

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
}
