/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';

/**
 * List of controllers
 */
const AuthController = () => import('#controllers/auth_controller');

/**
 * Authentication endpoints
 */
router.post('auth/setup', [AuthController, 'setup']);
router.post('auth/verify', [AuthController, 'verify']);
