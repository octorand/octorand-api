/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
const AuthController = () => import('#controllers/auth_controller');

router.post('auth/setup', [AuthController, 'setup']);
router.post('auth/verify', [AuthController, 'verify']);
