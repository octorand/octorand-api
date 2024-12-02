import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class GameSpellSeeker extends BaseModel {
  /**
   * Update naming strategy
   */
  public static namingStrategy = new SnakeCaseNamingStrategy();

  /**
   * Game id
   */
  @column({ isPrimary: true })
  declare id: number;

  /**
   * Game account id
   */
  @column()
  declare account_id: number | null;

  /**
   * Game secret word
   */
  @column()
  declare word: string;

  /**
   * Game revealed word
   */
  @column()
  declare reveal: string;

  /**
   * Game allowed letters
   */
  @column()
  declare allowed: string;

  /**
   * True if the game is started
   */
  @column()
  declare started: boolean;

  /**
   * True if the game is ended
   */
  @column()
  declare ended: boolean;

  /**
   * Game tries
   */
  @column()
  declare tries: number;

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

  /**
   * Account that deposit belongs to
   */
  @belongsTo(() => Account, { foreignKey: 'account_id' })
  declare account: BelongsTo<typeof Account>;
}
