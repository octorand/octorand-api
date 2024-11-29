import vine from '@vinejs/vine';

/**
 * Validate rankings parameters
 */
export const rankingsValidator = vine.compile(
  vine.object({
    account_id: vine.number(),
    account_address: vine.string().trim(),
  })
);