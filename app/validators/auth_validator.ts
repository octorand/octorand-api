import vine from '@vinejs/vine';

export const setupValidator = vine.compile(vine.object({}));

export const verifyValidator = vine.compile(
  vine.object({
    transaction_id: vine.string().trim(),
    private_key: vine.string().trim(),
  })
);
