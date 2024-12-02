import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { loadValidator, processValidator } from '#validators/game_validator';
import GameService from '#services/game_service';

@inject()
export default class GameController {
  /**
   * Initialise controller
   *
   * @param gameService
   */
  constructor(
    private gameService: GameService
  ) { }

  /**
   * Load game status
   *
   * @param context
   * @returns
   */
  async load(context: HttpContext) {
    // Validate request
    const payload = await context.request.validateUsing(loadValidator);

    // Load game status
    const status = this.gameService.loadGameStatus(payload.account_id, payload.game);

    // Prepare response
    const response = status;

    return response;
  }

  /**
   * Process game action
   *
   * @param context
   * @returns
   */
  async process(context: HttpContext) {
    // Validate request
    const payload = await context.request.validateUsing(processValidator);

    // Process game action
    const status = this.gameService.processGameAction(payload.account_id, payload.game, payload.action, payload.data);

    // Prepare response
    const response = status;

    return response;
  }
}
