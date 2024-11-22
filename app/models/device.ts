import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class Device extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare privateKey: string;

  @column()
  declare publicKey: string;

  @column()
  declare transactionId: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>;
}
