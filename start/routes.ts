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

/**
 * Guest endpoints
 */
router.post('auth/setup', [AuthController, 'setup']);
router.post('auth/verify', [AuthController, 'verify']);

/**
 * Authenticated endpoints
 */
router.group(() => {
    // Account endpoints
    router.get('account', [AccountController, 'index']);
}).use(middleware.auth());
