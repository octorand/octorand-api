import vine from '@vinejs/vine';
export const setupValidator = vine.compile(vine.object({}));
export const verifyValidator = vine.compile(vine.object({
    transaction_id: vine.string().trim(),
    private_key: vine.string().trim(),
}));
export const accountValidator = vine.compile(vine.object({
    account_id: vine.number().positive().withoutDecimals(),
    account_address: vine.string().trim(),
}));
//# sourceMappingURL=auth_validator.js.map