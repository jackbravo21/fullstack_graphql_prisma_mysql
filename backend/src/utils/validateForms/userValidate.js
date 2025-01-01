const Joi = require('joi');

const userLoginSchema = Joi.object({
    mail: Joi.string().email().max(255).required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.max': 'O e-mail não pode exceder 255 caracteres.',
        'string.email': 'O e-mail deve ser válido.',
    }),
    password: Joi.string()
        .min(6) // Tamanho mínimo de 6 caracteres
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/) // Ao menos uma letra e um número
        .required()
        .messages({
            'string.base': 'A senha deve ser uma string.',
            'string.empty': 'A senha é obrigatória.',
            'string.min': 'A senha deve ter pelo menos 6 caracteres.',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra e um número.',
        }),
});

const userCheckSchema = Joi.object({
    mail: Joi.string().email().max(255).required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.max': 'O e-mail não pode exceder 255 caracteres.',
        'string.email': 'O e-mail deve ser válido.',
    }),
});

const userCreateSchema = Joi.object({
    fullname: Joi.string().max(255).required().messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'O nome é obrigatório.',
        'string.max': 'O nome não pode exceder 255 caracteres.',
    }),
    mail: Joi.string().email().max(255).required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.max': 'O e-mail não pode exceder 255 caracteres.',
        'string.email': 'O e-mail deve ser válido.',
    }),
    cleanPassword: Joi.string()
        .min(6) // Tamanho mínimo de 6 caracteres
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/) // Ao menos uma letra e um número
        .required()
        .messages({
            'string.base': 'A senha deve ser uma string.',
            'string.empty': 'A senha é obrigatória.',
            'string.min': 'A senha deve ter pelo menos 6 caracteres.',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra e um número.',
        }),
    level: Joi.string().required().messages({
        'string.base': 'O nível deve ser uma string.',
        'string.empty': 'O nível é obrigatório.',
    }),
});

const userEditSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    }),
    fullname: Joi.string().max(255).required().messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'O nome é obrigatório.',
        'string.max': 'O nome não pode exceder 255 caracteres.',
    }),
    mail: Joi.string().email().max(255).required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.max': 'O e-mail não pode exceder 255 caracteres.',
        'string.email': 'O e-mail deve ser válido.',
    }),
    password: Joi.string()
        .min(6) // Tamanho mínimo de 6 caracteres
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/) // Ao menos uma letra e um número
        .required()
        .messages({
            'string.base': 'A senha deve ser uma string.',
            'string.empty': 'A senha é obrigatória.',
            'string.min': 'A senha deve ter pelo menos 6 caracteres.',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra e um número.',
        }),
    level: Joi.string().required().messages({
        'string.base': 'O nível deve ser uma string.',
        'string.empty': 'O nível é obrigatório.',
    }),
});

const idSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    })
});

module.exports = { userLoginSchema, userCheckSchema, userCreateSchema, userEditSchema, idSchema };




/*

Validação para a senha:
min(6): Garante que a senha tenha pelo menos 6 caracteres.
pattern(/^(?=.*[A-Za-z])(?=.*\d)/): Expressão regular que garante que a senha contenha pelo menos uma letra ([A-Za-z]) e pelo menos um número (\d).
A mensagem de erro foi ajustada para informar que a senha deve ter letras e números.



const userSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    }),
    fullname: Joi.string().max(255).required().messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'O nome é obrigatório.',
        'string.max': 'O nome não pode exceder 255 caracteres.',
    }),
    mail: Joi.string().email().max(255).required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.max': 'O e-mail não pode exceder 255 caracteres.',
        'string.email': 'O e-mail deve ser válido.',
    }),
    password: Joi.string()
        .min(6) // Tamanho mínimo de 6 caracteres
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/) // Ao menos uma letra e um número
        .required()
        .messages({
            'string.base': 'A senha deve ser uma string.',
            'string.empty': 'A senha é obrigatória.',
            'string.min': 'A senha deve ter pelo menos 6 caracteres.',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra e um número.',
        }),
    level: Joi.string().required().messages({
        'string.base': 'O nível deve ser uma string.',
        'string.empty': 'O nível é obrigatório.',
    }),
    created_at: Joi.string().max(255).required().messages({
        'string.empty': 'A data de criação é obrigatória.',
        'string.max': 'A data de criação não pode exceder 255 caracteres.',
    }),
});

*/