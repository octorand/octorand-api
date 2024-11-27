import vine from '@vinejs/vine';

/**
 * Validate setup parameters
 */
export const setupValidator = vine.compile(
  vine.object({})
);

/**
 * Validate verify parameters
 */
export const verifyValidator = vine.compile(
  vine.object({
    transaction_id: vine.string().trim(),
    private_key: vine.string().trim(),
  })
);

/**
 * Validate account parameters
 */
export const accountValidator = vine.compile(
  vine.object({
    account_id: vine.number(),
    account_address: vine.string(),
  })
);