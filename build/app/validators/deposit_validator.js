import vine from '@vinejs/vine';
export const syncValidator = vine.compile(vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
}));
//# sourceMappingURL=deposit_validator.js.map