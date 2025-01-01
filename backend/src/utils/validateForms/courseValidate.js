const Joi = require('joi');

const courseCreateSchema = Joi.object({
    title: Joi.string().max(255).required().messages({
        'string.base': 'O título deve ser uma string.',
        'string.empty': 'O título é obrigatório.',
        'string.max': 'O título não pode exceder 255 caracteres.',
    }),
    description: Joi.string().max(255).required().messages({
        'string.empty': 'A descrição é obrigatória.',
        'string.max': 'A descrição não pode exceder 255 caracteres.',
    }),
    teacher: Joi.number().integer().required().messages({
        'number.base': 'O campo professor deve ser um número.',
        'number.integer': 'O campo professor deve ser um número inteiro.',
        'any.required': 'O campo professor é obrigatório.',
    }),
});

const courseEditSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    }),
    title: Joi.string().max(255).required().messages({
        'string.base': 'O título deve ser uma string.',
        'string.empty': 'O título é obrigatório.',
        'string.max': 'O título não pode exceder 255 caracteres.',
    }),
    description: Joi.string().max(255).required().messages({
        'string.empty': 'A descrição é obrigatória.',
        'string.max': 'A descrição não pode exceder 255 caracteres.',
    }),
    teacher: Joi.number().integer().required().messages({
        'number.base': 'O campo professor deve ser um número.',
        'number.integer': 'O campo professor deve ser um número inteiro.',
        'any.required': 'O campo professor é obrigatório.',
    }),
});

const idSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    })
});

module.exports = { courseCreateSchema, courseEditSchema, idSchema };




/*

const courseSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    }),
    title: Joi.string().max(255).required().messages({
        'string.base': 'O título deve ser uma string.',
        'string.empty': 'O título é obrigatório.',
        'string.max': 'O título não pode exceder 255 caracteres.',
    }),
    description: Joi.string().max(255).required().messages({
        'string.empty': 'A descrição é obrigatória.',
        'string.max': 'A descrição não pode exceder 255 caracteres.',
    }),
    image: Joi.string().required().messages({
        'string.base': 'A imagem deve ser uma string.',
        'string.empty': 'A imagem é obrigatória.',
    }),
    teacher: Joi.number().integer().required().messages({
        'number.base': 'O campo professor deve ser um número.',
        'number.integer': 'O campo professor deve ser um número inteiro.',
        'any.required': 'O campo professor é obrigatório.',
    }),
    created_at: Joi.string().max(255).required().messages({
        'string.empty': 'A data de criação é obrigatória.',
        'string.max': 'A data de criação não pode exceder 255 caracteres.',
    }),
});

*/