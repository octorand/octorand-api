import vine from '@vinejs/vine';
export const loadValidator = vine.compile(vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
    game: vine.string().in(['spell-seeker']),
}));
export const processValidator = vine.compile(vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
    game: vine.string().in(['spell-seeker']),
    action: vine.string().trim(),
    data: vine.object({}).allowUnknownProperties(),
}));
//# sourceMappingURL=game_validator.js.map