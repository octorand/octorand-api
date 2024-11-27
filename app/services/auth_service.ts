import { inject } from '@adonisjs/core';
import { appKey } from '#config/app';
import env from '#start/env';
import string from '@adonisjs/core/helpers/string';
import IndexerHelper from '#helpers/indexer_helper';
import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';
import Device from '#models/device';
import jwt from 'jsonwebtoken';

@inject()
export default class AuthService {
  /**
   * Initialise service
   *
   * @param indexerHelper
   */
  constructor(private indexerHelper: IndexerHelper) { }

  /**
   * Setup authentication parameters
   *
   * @returns
   */
  async setup() {
    // Create new device
    const device = new Device();
    device.private_key = string.random(48);
    device.public_key = string.random(48);
    await device.save();

    // Prepare response
    const response = device.serialize({
      fields: {
        pick: ['private_key', 'public_key'],
      },
    });

    return response;
  }

  /**
   * Verify authentication parameters
   *
   * @param payload
   * @returns
   */
  async verify(payload: any) {
    // Read parameters
    const private_key = payload.private_key;
    const transaction_id = payload.transaction_id;

    // Read contract parameters
    const contract_auth_application_id = env.get('CONTRACT_AUTH_APPLICATION_ID');
    const contract_auth_method_signature = env.get('CONTRACT_AUTH_METHOD_SIGNATURE');

    // Read transaction details
    const transaction = await this.indexerHelper.lookupTransaction(transaction_id);
    const sender = transaction['sender'];
    const application_id = transaction['application-transaction']['application-id'];
    const method_signature = Buffer.from(transaction['application-transaction']['application-args'][0], 'base64').toString('hex');
    const public_key = Buffer.from(transaction['application-transaction']['application-args'][1], 'base64').toString('utf-8');

    // Verify transaction account
    if (application_id != contract_auth_application_id) {
      throw new UnprocessableException('Invalid application id');
    }

    // Verify transaction method
    if (method_signature != contract_auth_method_signature) {
      throw new UnprocessableException('Invalid method signature');
    }

    // Find device
    const device = await Device.query()
      .where('private_key', private_key)
      .where('public_key', public_key)
      .whereNull('account_id')
      .first();

    // Verify device
    if (!device) {
      throw new UnprocessableException('Invalid device');
    }

    // Find or create account
    let account = await Account.query().where('address', sender).first();
    if (!account) {
      account = new Account();
      account.address = sender;
      account.hearts = 5;
      account.stars = 0;
      await account.save();
    }

    // Assign device to account
    await device.related('account').associate(account);

    // Generate token
    const secret = appKey.valueOf();
    const data = { id: account.id, address: account.address, public_key: public_key, transaction_id: transaction_id };
    const token = jwt.sign(data, secret);

    return {
      token: token
    };
  }
}
