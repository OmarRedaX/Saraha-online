import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const signup_custom = {

    body: Joi.object().keys({

        email: generalFields.email.required(),
        username: generalFields.username.required(),
        password: generalFields.password.required(),
        confirmationPassword: generalFields.confirmationPassword.required(),
        phone: generalFields.phone

        }).required().options({allowUnknown: false}),
        
    params: Joi.object().keys({
        id: generalFields.id.required()
        }).required().options({allowUnknown: false}),

        headers: Joi.object().keys({
            'accept-language': generalFields['accept-language']
        }).required().options({allowUnknown: true})

}

export const signup = Joi.object().keys({

        email: generalFields.email.required(),
        username: generalFields.username.required(),
        password: generalFields.password.required(),
        confirmationPassword: generalFields.confirmationPassword.required(),
        phone: generalFields.phone,
       
    }).required().options({allowUnknown: false});
        


export const login = Joi.object().keys({

    email: generalFields.email.required(),
    password: generalFields.password.required(),

}).required().options({allowUnknown: false});


export const activateAccount = Joi.object().keys({

    email: generalFields.email.required(),
    otp: generalFields.otp.required()
    
}).required().options({allowUnknown: false});