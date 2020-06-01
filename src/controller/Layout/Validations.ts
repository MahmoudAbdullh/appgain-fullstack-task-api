import { checkSchema } from 'express-validator';
/**
 * validator schema for
 */
export const LayoutValidation = checkSchema({
    id:{
        notEmpty: true,
        isString: true
    }
})