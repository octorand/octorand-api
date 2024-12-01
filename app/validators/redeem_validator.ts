import vine from '@vinejs/vine';

/**
 * Validate process parameters
 */
export const processValidator = vine.compile(
  vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
    prime_generation: vine.number().positive().withoutDecimals().in([1, 2]),
    prime_position: vine.number().positive().withoutDecimals(),
    stars: vine.number().positive().withoutDecimals(),
    action: vine.string().in(['score']),
  })
);