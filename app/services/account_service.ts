import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';

@inject()
export default class AccountService {
  /**
   * Initialise service
   */
  constructor() { }

  /**
   * Read account details
   *
   * @param id
   * @returns
   */
  async read(id: number) {
    // Fetch account details
    let account = await Account.find(id);

    // Verify account
    if (!account) {
      throw new UnprocessableException('Invalid account');
    }

    // Prepare response
    const response = account.serialize({
      fields: {
        pick: ['id', 'address', 'hearts', 'stars'],
      },
    });

    return response;
  }
}
