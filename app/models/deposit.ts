import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Deposit extends BaseModel {
  /**
   * Deposit id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Deposit transaction id
   */
  @column()
  declare transactionId: string;

  /**
   * Sender of depoit
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
  declare createdAt: DateTime;

  /**
   * Deposit updated timestamp
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
