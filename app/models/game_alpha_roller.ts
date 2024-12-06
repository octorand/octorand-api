import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Account from './account.js';

export default class GameAlphaRoller extends BaseModel {
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
   * Game user inputs
   */
  @column()
  declare inputs: string;

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
   * True if first game boost is applied
   */
  @column()
  declare boost_1: boolean;

  /**
   * True if second game boost is applied
   */
  @column()
  declare boost_2: boolean;

  /**
   * Game successful guesses
   */
  @column()
  declare hits: number;

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
