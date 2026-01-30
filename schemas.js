const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.any(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .min(1)
            .max(5)
            .required()
            .messages({
                'number.base': 'Rating must be a number',
                'number.min': 'Please provide a rating',
                'any.required': 'Rating is required'
            }),

        body: Joi.string()
            .required()
            .messages({
                'string.empty': 'Review text cannot be empty',
                'any.required': 'Review text is required'
            })
    }).required()
});


