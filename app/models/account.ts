import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Device from './device.js';

export default class Account extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Account id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Account address
   */
  @column()
  declare address: string;

  /**
   * Account balance
   */
  @column()
  declare balance: number;

  /**
   * Account creation timestamp
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  /**
   * Account updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  /**
   * List of devices belongs to account
   */
  @hasMany(() => Device)
  declare devices: HasMany<typeof Device>;
}
