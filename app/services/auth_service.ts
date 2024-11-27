import string from '@adonisjs/core/helpers/string';
import { appKey } from '#config/app';
import Device from '#models/device';
import jwt from 'jsonwebtoken';

export default class AuthService {
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

    // // Find device
    // const device = await Device.findBy('private_key', private_key);

    // // Read transaction details
    const address = '';
    const public_key = '';

    // // Verify parameters

    // Generate token
    const secret = appKey.valueOf();
    const token = jwt.sign({ id: 10, public_key: public_key, transaction_id: transaction_id }, secret);

    let verified = {};
    try {
      var decoded = jwt.verify(token, secret);
      verified = decoded;
    } catch (err) {
      verified = {};
    }

    return {
      token: token,
      verified: verified
    };
  }
}
