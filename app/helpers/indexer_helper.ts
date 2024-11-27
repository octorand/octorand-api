import env from '#start/env';
import algosdk from 'algosdk';
import { createHash } from 'node:crypto';

export default class IndexerHelper {

    /**
     * Algorand indexer client
     */
    private indexer_client: algosdk.Indexer;

    /**
     * Page size when retrieving results
     */
    private page_size: number;

    /**
     * Construct component
     */
    constructor() {
        this.indexer_client = new algosdk.Indexer('', env.get('ALGO_INDEXER_URL'), '');
        this.page_size = env.get('ALGO_INDEXER_PAGE_SIZE');
    }

    /**
     * Lookup account by address
     *
     * @param address
     */
    async lookupAccount(address: string): Promise<any> {
        let response = await this.indexer_client.lookupAccountByID(address).do();
        let account = response['account'];

        return account;
    }

    /**
     * Lookup asset by id
     *
     * @param id
     */
    async lookupAsset(id: number): Promise<any> {
        let response = await this.indexer_client.lookupAssetByID(id).do();
        let asset = response['asset'];

        return asset;
    }

    /**
     * Lookup application by id
     *
     * @param id
     */
    async lookupApplication(id: number): Promise<any> {
        let response = await this.indexer_client.lookupApplications(id).do();
        let application = response['application'];

        return application;
    }

    /**
     * Lookup transaction by id
     *
     * @param id
     */
    async lookupTransaction(id: string): Promise<any> {
        let response = await this.indexer_client.lookupTransactionByID(id).do();
        let transaction = response['transaction'];

        return transaction;
    }

    /**
     * Lookup account local states
     *
     * @param id
     * @param address
     */
    async lookupAccountApplicationLocalStates(id: number, address: string): Promise<any> {
        let response = await this.indexer_client.lookupAccountAppLocalStates(address).applicationID(id).do();

        return {
            address: address,
            states: response['apps-local-states']
        };
    }

    /**
     * Lookup applications created by an account
     *
     * @param address
     */
    async lookupAccountCreatedApplications(address: string): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'applications';
        let applications = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAccountCreatedApplications(address), limit, key);
        for (let i = 0; i < pager.length; i++) {
            applications.push(pager[i]);
        }

        return applications;
    }

    /**
     * Lookup assets created by an account
     *
     * @param address
     */
    async lookupAccountCreatedAssets(address: string): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'assets';
        let assets = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAccountCreatedAssets(address), limit, key);
        for (let i = 0; i < pager.length; i++) {
            assets.push(pager[i]);
        }

        return assets;
    }

    /**
     * Lookup balances for an asset
     *
     * @param id
     * @param min
     */
    async lookupAssetBalances(id: number, min: number = 0): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'balances';
        let balances = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAssetBalances(id).currencyGreaterThan(min), limit, key);
        for (let i = 0; i < pager.length; i++) {
            balances.push(pager[i]);
        }

        return balances;
    }

    /**
     * Lookup transactions for an asset
     *
     * @param id
     */
    async lookupAssetTransactions(id: number): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAssetTransactions(id), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }

        return transactions;
    }

    /**
     * Lookup payment transactions from an account
     *
     * @param from
     */
    async lookupPaymentTransactions(from: string): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAccountTransactions(from).txType('pay').currencyGreaterThan(0), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }

        return transactions;
    }

    /**
     * Lookup asset transfer transactions from an account
     *
     * @param from
     * @param id
     */
    async lookupAssetTransferTransactions(from: string, id: number): Promise<Array<any>> {
        let limit = this.page_size;
        let key = 'transactions';
        let transactions = [];

        let pager = await this.getPagedResults(this.indexer_client.lookupAccountTransactions(from).assetID(id).txType('axfer').currencyGreaterThan(0), limit, key);
        for (let i = 0; i < pager.length; i++) {
            transactions.push(pager[i]);
        }

        return transactions;
    }

    /**
     * Get a list of paged results from indexer
     *
     * @param callback
     * @param limit
     * @param key
     */
    private async getPagedResults(callback: any, limit: number, key: string) {
        let entries = [];
        let pages: Array<any> = [];
        let hashes: Array<string> = [];

        let next = '';
        while (next !== undefined) {
            let response = await callback.limit(limit).nextToken(next).do();
            let data = response[key];
            next = response['next-token'];

            if (pages.includes(next)) {
                break;
            } else {
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
