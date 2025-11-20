import Joi from 'joi';
import { Types } from 'mongoose';

export const validateObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid ObjectId");
}


export const generalFields = {

    email: Joi.string().email({minDomainSegments: 2, maxDomainSegments: 3 , tlds: { allow: ['com', 'net', 'edu'] }}),
    username: Joi.string().alphanum().case('upper').min(3).max(30).messages({
                'string.min': 'Username must be at least 3 characters long',
                'string.empty': 'Username is not allowed to be empty',
                'any.required': 'Username is a required field'
            }),
            password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
            confirmationPassword: Joi.string().valid(Joi.ref('password')),
            phone: Joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
            DOB:Joi.date().less('now'),
            id: Joi.string().custom(validateObjectId),
            'accept-language': Joi.string().valid('en', 'ar'),
            otp: Joi.string().length(4).pattern(new RegExp(/^[0-9]{4}$/))
}



export const validation_custom = (schema)=> {
    return (req,res,next) => {

        const validationErrors = []; 

        for (const key of Object.keys(schema)) {
            const validationResult = schema[key].validate(req[key] , { abortEarly: false });
            if (validationResult.error) {
                validationErrors.push({key, Error: validationResult.error.details});
            }
        }

        if (validationErrors.length) {
            return res.status(400).json({message: "Validation Error" , validationResult: validationErrors});
        }

        return next();

        // const validationResult = schema.validate(req.body , { abortEarly: false });
        // if (validationResult.error) {
        //     return res.status(400).json({message: "Validation Error" , validationResult: validationResult.error.details});
        // }

        // return next();
    }
    
       
}


export const validation = (schema)=> {
    return (req,res,next) => {
        
        const inputData = { ...req.body, ...req.query, ...req.params };
        if(req.headers['accept-language']){
            inputData['accept-language'] = req.headers['accept-language'];
        }

        const validationResult = schema.validate(inputData , { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).json({message: "Validation Error" , validationResult: validationResult.error.details});
        }

        return next();

       
    }
    
       
}