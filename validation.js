//Validation
const Joi = require('@hapi/joi')

const registrationValidation =(registrationData)=>{
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})
    return schema.validate(registrationData)
}
const loginValidation = (registrationData)=>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
        return schema.validate(registrationData)
    }
module.exports={
    registrationValidation,
    loginValidation
}
