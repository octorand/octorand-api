import vine from '@vinejs/vine';
export const rankingsValidator = vine.compile(vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
}));
//# sourceMappingURL=account_validator.js.map