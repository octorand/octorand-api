import { inject } from '@adonisjs/core';
import env from '#start/env';
import IndexerHelper from '#helpers/indexer_helper';
import Deposit from '#models/deposit';
import Account from '#models/account';

@inject()
export default class DepositService {
  /**
   * Initialise service
   *
   * @param indexerHelper
   */
  constructor(private indexerHelper: IndexerHelper) { }

  /**
   * Sync deposits
   */
  async syncDeposits() {
    // Read contract parameters
    const contract_deposit_application_id = env.get('CONTRACT_DEPOSIT_APPLICATION_ID');
    const contract_deposit_method_signature = env.get('CONTRACT_DEPOSIT_METHOD_SIGNATURE');

    // Read transactions
    const transactions = await this.indexerHelper.lookupAssetTransactions(contract_deposit_application_id);

    // Process transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      const transaction_id = transaction['id'];
      const round = transaction['confirmed-round'];

      // Check if the transaction already processed
      let deposit = await Deposit.query().where('transaction_id', transaction_id).first();

      if (!deposit) {
        const sender = transaction['sender'];
        const application_transaction = transaction['application-transaction'];

        // Read data of application transaction
        if (application_transaction) {
          const application_id = application_transaction['application-id'];

          // Make sure application id matches
          if (application_id === contract_deposit_application_id) {
            const application_args = application_transaction['application-args'];

            // Make sure arguments count matches
            if (application_args.length === 2) {
              const method_signature = Buffer.from(application_args[0], 'base64').toString('hex');

              // Make sure method signature matches
              if (method_signature === contract_deposit_method_signature) {
                const amount = this.indexerHelper.decodeNumber(Buffer.from(application_args[1], 'base64'));

                // Find or create the account
                let account = await Account.query().where('address', sender).first();
                if (!account) {
                  account = new Account();
                  account.address = sender;
                  account.hearts = 5;
                  account.stars = 0;
                  await account.save();
                }

                // Insert deposit record
                deposit = new Deposit();
                deposit.transaction_id = transaction_id;
                deposit.round = round;
                deposit.sender = sender;
                deposit.amount = amount;
                await deposit.save();

                // Update hearts count
                account.hearts = account.hearts + Math.floor(amount / Math.pow(10, 6));
                await account.save();
              }
            }
          }
        }
      }
    }
  }
}
