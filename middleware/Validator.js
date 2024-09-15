const Joi = require("joi");

module.exports = userSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "any.required": "missing name",
        "string.base": "name must be a string",
        "string.empty": "name is required",
        "string.min":"5 charesters must"

    }),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(128)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,128}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password cannot be longer than 128 characters.'
        }),
});



