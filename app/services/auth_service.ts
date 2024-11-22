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

    return device;
  }

  /**
   * Verify authentication parameters
   *
   * @param payload
   * @returns
   */
  async verify(payload: any) {
    return payload;
  }
}
