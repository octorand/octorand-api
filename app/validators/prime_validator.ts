import vine from '@vinejs/vine';

/**
 * Validate all parameters
 */
export const allValidator = vine.compile(
  vine.object({})
);