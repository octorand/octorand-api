import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Device from './device.js';

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare address: string;

  @column()
  declare balance: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasMany(() => Device)
  declare devices: HasMany<typeof Device>;
}
