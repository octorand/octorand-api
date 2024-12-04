import { inject } from '@adonisjs/core';
import env from '#start/env';
import db from '@adonisjs/lucid/services/db';
import DiscordHelper from '#helpers/discord_helper';
import IdentityHelper from '#helpers/identity_helper';
import IndexerHelper from '#helpers/indexer_helper';
import Deposit from '#models/deposit';
import Account from '#models/account';

@inject()
export default class DepositService {
  /**
   * Initialise service
   *
   * @param discordHelper
   * @param identityHelper
   * @param indexerHelper
   */
  constructor(
    private discordHelper: DiscordHelper,
    private identityHelper: IdentityHelper,
    private indexerHelper: IndexerHelper
  ) { }

  /**
   * Sync deposits
   */
  async syncDeposits() {
    // Read contract parameters
    const contract_deposit_application_id = env.get('CONTRACT_DEPOSIT_APPLICATION_ID');
    const contract_deposit_method_signature = env.get('CONTRACT_DEPOSIT_METHOD_SIGNATURE');

    // Find minimum round to fetch transactions from
    let min_deposit_round = await db.from('deposits').min('round', 'min_round');
    let min_round = min_deposit_round[0].min_round ? min_deposit_round[0].min_round : 0;

    // Read transactions
    const transactions = await this.indexerHelper.lookupAssetTransactions(contract_deposit_application_id, min_round);

    // Process transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      const transaction_id = transaction['id'];
      const round = transaction['confirmed-round'];

      // Check if the transaction already processed
      let deposit = await Deposit.query()
        .where('transaction_id', transaction_id)
        .first();

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
                  account.hearts = 0;
                  account.stars = 0;
                  account.total = 0;
                  account.ranking = 0;
                  await account.save();
                }

                // Insert deposit record
                deposit = new Deposit();
                deposit.account_id = account.id;
                deposit.transaction_id = transaction_id;
                deposit.round = round;
                deposit.amount = amount;
                await deposit.save();

                // Calculate hearts
                let hearts = Math.floor(amount / Math.pow(10, 6));

                // Update account hearts
                account.hearts = account.hearts + hearts;
                await account.save();

                // Send event to discord
                let name = await this.identityHelper.findName(account.address);
                this.discordHelper.send(name + ' bought ' + hearts + ' hearts :heart:');
              }
            }
          }
        }
      }
    }
  }
}
