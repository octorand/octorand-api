/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel'

/**
 * List of controllers
 */
const AccountController = () => import('#controllers/account_controller');
const AuthController = () => import('#controllers/auth_controller');
const DepositController = () => import('#controllers/deposit_controller');
const GameController = () => import('#controllers/game_controller');
const PrimeController = () => import('#controllers/prime_controller');
const RedeemController = () => import('#controllers/redeem_controller');

/**
 * Guest endpoints
 */
router.group(() => {
    // Authentication endpoints
    router.post('auth/setup', [AuthController, 'setup']);
    router.post('auth/verify', [AuthController, 'verify']);

    // Prime endpoints
    router.post('prime/all', [PrimeController, 'all']);
}).use(middleware.auth_guest());

/**
 * Authenticated endpoints
 */
router.group(() => {
    // Authentication endpoints
    router.post('auth/account', [AuthController, 'account']);

    // Account endpoints
    router.post('account/rankings', [AccountController, 'rankings']);

    // Deposit endpoints
    router.post('deposit/sync', [DepositController, 'sync']);

    // Redeem endpoints
    router.post('redeem/process', [RedeemController, 'process']);

    // Game endpoints
    router.post('game/load', [GameController, 'load']);
    router.post('game/process', [GameController, 'process']);
}).use(middleware.auth_account());
