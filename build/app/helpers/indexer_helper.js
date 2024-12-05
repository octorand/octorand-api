import env from '#start/env';
import algosdk from 'algosdk';
import { createHash } from 'node:crypto';
export default class IndexerHelper {
    indexer_client;
    page_size;
    constructor() {
        this.indexer_client = new algosdk.Indexer('', env.get('ALGO_INDEXER_URL'), '');
        this.page_size = env.get('ALGO_INDEXER_PAGE_SIZE');
    }
    decodeNumber(value) {
        return Number(algosdk.decodeUint64(value, 'bigint'));
    }
    async lookupAccount(address) {
        let response = await this.indexer_client.lookupAccountByID(address).do();
        let account = response['account'];
        return account;
    }
    async lookupAsset(id) {
        let response = await this.indexer_client.lookupAssetByID(id).do();
        let asset = response['asset'];
        return asset;
    }
    async lookupApplication(id) {
        let response = await this.indexer_client.lookupApplications(id).do();
        let application = response['application'];
        return application;
    }
    async lookupTransaction(id) {
        let response = await this.indexer_client.lookupTransactionByID(id).do();
        let transaction = response['transaction'];
        return transaction;
    }
    async lookupAccountApplicationLocalStates(id, address) {
        let response = await this.indexer_client.lookupAccountAppLocalStates(address).applicationID(id).do();
        return {
            address: address,
            states: response['apps-local-states']
        };
    }
    async lookupAccountCreatedApplications(address) {
        let limit = this.page_size;
        let key = 'applications';
        let applications = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAccountCreatedApplications(address), limit, key);
        for (let i = 0; i < pager.length; i++) {
            applications.push(pager[i]);
        }
        return applications;
    }
    async lookupAccountCreatedAssets(address) {
        let limit = this.page_size;
        let key = 'assets';
        let assets = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAccountCreatedAssets(address), limit, key);
        for (let i = 0; i < pager.length; i++) {
            assets.push(pager[i]);
        }
        return assets;
    }
    async lookupAssetBalances(id, min = 0) {
        let limit = this.page_size;
        let key = 'balances';
        let balances = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAssetBalances(id).currencyGreaterThan(min), limit, key);
        for (let i = 0; i < pager.length; i++) {
            balances.push(pager[i]);
        }
        return balances;
    }
    async lookupAssetTransactions(id, min_round) {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAssetTransactions(id).minRound(min_round), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }
        return transactions;
    }
    async lookupPaymentTransactions(from) {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAccountTransactions(from).txType('pay').currencyGreaterThan(0), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }
        return transactions;
    }
    async lookupAssetTransferTransactions(from, id) {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];
        let pager = await this.getPagedResults(this.indexer_client.lookupAccountTransactions(from).assetID(id).txType('axfer').currencyGreaterThan(0), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }
        return transactions;
    }
    async getPagedResults(callback, limit, key) {
        let entries = [];
        let pages = [];
        let hashes = [];
        let next = '';
        while (next !== undefined) {
            let response = await callback.limit(limit).nextToken(next).do();
            let data = response[key];
            next = response['next-token'];
            if (pages.includes(next)) {
                break;
            }
            else {
                pages.push(next);
            }
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let entry = data[i];
                    let hash = createHash('md5').update(JSON.stringify(entry)).digest("hex");
                    if (!hashes.includes(hash)) {
                        entries.push(entry);
                        hashes.push(hash);
                    }
                }
            }
        }
        return entries;
    }
}
//# sourceMappingURL=indexer_helper.js.map