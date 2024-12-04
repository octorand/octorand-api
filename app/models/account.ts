import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Deposit from './deposit.js';
import Device from './device.js';
import Redeem from './redeem.js';

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
   * Account hearts balance
   */
  @column()
  declare hearts: number;

  /**
   * Account stars balance
   */
  @column()
  declare stars: number;

  /**
   * Account total stars
   */
  @column()
  declare total: number;

  /**
   * Account ranking
   */
  @column()
  declare ranking: number;

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
   * List of deposits belongs to account
   */
  @hasMany(() => Deposit, { foreignKey: 'account_id' })
  declare deposits: HasMany<typeof Deposit>;

  /**
   * List of devices belongs to account
   */
  @hasMany(() => Device, { foreignKey: 'account_id' })
  declare devices: HasMany<typeof Device>;

  /**
   * List of redeems belongs to account
   */
  @hasMany(() => Redeem, { foreignKey: 'redeem_id' })
  declare redeems: HasMany<typeof Redeem>;
}
