import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
const AccountController = () => import('#controllers/account_controller');
const AuthController = () => import('#controllers/auth_controller');
const DepositController = () => import('#controllers/deposit_controller');
const GameController = () => import('#controllers/game_controller');
const PrimeController = () => import('#controllers/prime_controller');
const RedeemController = () => import('#controllers/redeem_controller');
router.group(() => {
    router.post('auth/setup', [AuthController, 'setup']);
    router.post('auth/verify', [AuthController, 'verify']);
    router.post('prime/all', [PrimeController, 'all']);
}).use(middleware.auth_guest());
router.group(() => {
    router.post('auth/account', [AuthController, 'account']);
    router.post('account/rankings', [AccountController, 'rankings']);
    router.post('deposit/sync', [DepositController, 'sync']);
    router.post('redeem/process', [RedeemController, 'process']);
    router.post('game/load', [GameController, 'load']);
    router.post('game/process', [GameController, 'process']);
}).use(middleware.auth_account());
//# sourceMappingURL=routes.js.map