import vine from '@vinejs/vine';

const games = [
  'alpha-roller',
  'spell-seeker',
];

/**
 * Validate load parameters
 */
export const loadValidator = vine.compile(
  vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
    game: vine.string().in(games),
  })
);

/**
 * Validate process parameters
 */
export const processValidator = vine.compile(
  vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
    game: vine.string().in(games),
    action: vine.string().trim(),
    data: vine.object({}).allowUnknownProperties(),
  })
);