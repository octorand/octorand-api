var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from '@adonisjs/core';
import env from '#start/env';
import db from '@adonisjs/lucid/services/db';
import DiscordHelper from '#helpers/discord_helper';
import IdentityHelper from '#helpers/identity_helper';
import IndexerHelper from '#helpers/indexer_helper';
import Deposit from '#models/deposit';
import Account from '#models/account';
let DepositService = class DepositService {
    discordHelper;
    identityHelper;
    indexerHelper;
    constructor(discordHelper, identityHelper, indexerHelper) {
        this.discordHelper = discordHelper;
        this.identityHelper = identityHelper;
        this.indexerHelper = indexerHelper;
    }
    async syncDeposits() {
        const contract_deposit_application_id = env.get('CONTRACT_DEPOSIT_APPLICATION_ID');
        const contract_deposit_method_signature = env.get('CONTRACT_DEPOSIT_METHOD_SIGNATURE');
        let min_deposit_round = await db.from('deposits').min('round', 'min_round');
        let min_round = min_deposit_round[0].min_round ? min_deposit_round[0].min_round : 0;
        const transactions = await this.indexerHelper.lookupAssetTransactions(contract_deposit_application_id, min_round);
        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const transaction_id = transaction['id'];
            const round = transaction['confirmed-round'];
            let deposit = await Deposit.query()
                .where('transaction_id', transaction_id)
                .first();
            if (!deposit) {
                const sender = transaction['sender'];
                const application_transaction = transaction['application-transaction'];
                if (application_transaction) {
                    const application_id = application_transaction['application-id'];
                    if (application_id === contract_deposit_application_id) {
                        const application_args = application_transaction['application-args'];
                        if (application_args.length === 2) {
                            const method_signature = Buffer.from(application_args[0], 'base64').toString('hex');
                            if (method_signature === contract_deposit_method_signature) {
                                const amount = this.indexerHelper.decodeNumber(Buffer.from(application_args[1], 'base64'));
                                let account = await Account.query().where('address', sender).first();
                                if (!account) {
                                    account = new Account();
                                    account.address = sender;
                                    account.hearts = 0;
                                    account.stars = 0;
                                    account.total = 0;
                                    account.ranking = 0;
                                    await account.save();
                                }
                                deposit = new Deposit();
                                deposit.account_id = account.id;
                                deposit.transaction_id = transaction_id;
                                deposit.round = round;
                                deposit.amount = amount;
                                await deposit.save();
                                let hearts = Math.floor(amount / Math.pow(10, 6));
                                account.hearts = account.hearts + hearts;
                                await account.save();
                                let name = await this.identityHelper.findName(account.address);
                                this.discordHelper.send(name + ' bought ' + hearts + ' hearts :heart:');
                            }
                        }
                    }
                }
            }
        }
    }
};
DepositService = __decorate([
    inject(),
    __metadata("design:paramtypes", [DiscordHelper,
        IdentityHelper,
        IndexerHelper])
], DepositService);
export default DepositService;
//# sourceMappingURL=deposit_service.js.map