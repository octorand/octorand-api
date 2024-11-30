import vine from '@vinejs/vine';

/**
 * Validate process parameters
 */
export const processValidator = vine.compile(
  vine.object({
    account_id: vine.number(),
    account_address: vine.string().trim(),
    prime_generation: vine.number().min(1).max(2),
    prime_position: vine.number().min(0),
    stars: vine.number().min(0),
    action: vine.string().in(['score']),
  })
);