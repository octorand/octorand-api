import vine from '@vinejs/vine';

/**
 * Validate sync parameters
 */
export const syncValidator = vine.compile(
  vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
  })
);