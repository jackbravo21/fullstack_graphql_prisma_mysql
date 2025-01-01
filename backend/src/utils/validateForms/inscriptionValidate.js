const Joi = require('joi');

const inscriptionCreateSchema = Joi.object({
    studentID: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID do estudante é obrigatório.',
    }),
    courseID: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID do curso é obrigatório.',
    }),
});

const idSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'O ID deve ser um número.',
        'number.integer': 'O ID deve ser um número inteiro.',
        'any.required': 'O ID é obrigatório.',
    })
});

module.exports = { inscriptionCreateSchema, idSchema };

