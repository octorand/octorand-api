import { DateTime } from 'luxon';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';
import Device from './device.js';

export default class Verification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare transactionId: string;

  @column()
  declare sender: string;

  @column()
  declare code: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasOne(() => Device)
  declare device: HasOne<typeof Device>;
}
