import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class Device extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Device id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Device private key
   */
  @column()
  declare private_key: string;

  /**
   * Device public key
   */
  @column()
  declare public_key: string;

  /**
   * Device verification transaction id
   */
  @column()
  declare transaction_id: string;

  /**
   * Device creation timestamp
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  /**
   * Device updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  /**
   * Account that device belongs to
   */
  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>;
}
