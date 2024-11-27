import vine from '@vinejs/vine';

/**
 * Validate index parameters
 */
export const indexValidator = vine.compile(vine.object({}));