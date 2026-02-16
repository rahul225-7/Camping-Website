const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().messages({
            'string.empty': 'Campground title cannot be empty',
            'any.required': 'Campground title is required'
        }),
        price: Joi.number().required().min(0).messages({
            'number.base': 'Price must be a valid number',
            'number.min': 'Price cannot be negative',
            'any.required': 'Price is required'
        }),
        image: Joi.any(),
        location: Joi.string().required().messages({
            'string.empty': 'Location cannot be empty',
            'any.required': 'Location is required'
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Description cannot be empty',
            'any.required': 'Description is required'
        })
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


