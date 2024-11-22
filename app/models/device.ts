import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class Device extends BaseModel {
  /**
   * Device id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Device secret uuid
   */
  @column()
  declare privateKey: string;

  /**
   * Device public uuid
   */
  @column()
  declare publicKey: string;

  /**
   * Device verification transaction id
   */
  @column()
  declare transactionId: string;

  /**
   * Device creation timestamp
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  /**
   * Device updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  /**
   * Account that device belongs to
   */
  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>;
}
