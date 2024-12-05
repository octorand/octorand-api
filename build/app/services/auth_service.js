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
import { appKey } from '#config/app';
import env from '#start/env';
import string from '@adonisjs/core/helpers/string';
import IndexerHelper from '#helpers/indexer_helper';
import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';
import Device from '#models/device';
import jwt from 'jsonwebtoken';
let AuthService = class AuthService {
    indexerHelper;
    constructor(indexerHelper) {
        this.indexerHelper = indexerHelper;
    }
    async setupDevice() {
        const device = new Device();
        device.private_key = string.random(48);
        device.public_key = string.random(48);
        await device.save();
        return device;
    }
    async verifyDevice(private_key, transaction_id) {
        const contract_auth_application_id = env.get('CONTRACT_AUTH_APPLICATION_ID');
        const contract_auth_method_signature = env.get('CONTRACT_AUTH_METHOD_SIGNATURE');
        const transaction = await this.indexerHelper.lookupTransaction(transaction_id);
        const sender = transaction['sender'];
        const application_transaction = transaction['application-transaction'];
        const application_id = application_transaction['application-id'];
        const application_args = application_transaction['application-args'];
        const method_signature = Buffer.from(application_args[0], 'base64').toString('hex');
        const public_key = Buffer.from(application_args[1], 'base64').toString('utf-8');
        if (application_id != contract_auth_application_id) {
            throw new UnprocessableException('Invalid application id');
        }
        if (method_signature != contract_auth_method_signature) {
            throw new UnprocessableException('Invalid method signature');
        }
        const device = await Device.query()
            .where('private_key', private_key)
            .where('public_key', public_key)
            .whereNull('account_id')
            .first();
        if (!device) {
            throw new UnprocessableException('Invalid device');
        }
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
        device.account_id = account.id;
        device.transaction_id = transaction_id;
        await device.save();
        const secret = appKey.valueOf();
        const data = { id: account.id, address: account.address, public_key: public_key, transaction_id: transaction_id };
        const token = jwt.sign(data, secret);
        return token;
    }
    async getCurrentAccount(account_id, account_address) {
        let account = await Account.query()
            .where('id', account_id)
            .where('address', account_address)
            .first();
        if (!account) {
            throw new UnprocessableException('Invalid account');
        }
        return account;
    }
};
AuthService = __decorate([
    inject(),
    __metadata("design:paramtypes", [IndexerHelper])
], AuthService);
export default AuthService;
//# sourceMappingURL=auth_service.js.map