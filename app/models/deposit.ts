import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Deposit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare transactionId: string;

  @column()
  declare sender: string;

  @column()
  declare amount: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
