import string from '@adonisjs/core/helpers/string';
import Device from '#models/device';

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

    // Find device
    const device = await Device.findBy('private_key', private_key);

    // Read transaction details
    const address = '';
    const public_key = '';

    // Verify parameters

    // Generate token
    const token = '';

    return {
      token: token,
    };
  }
}
