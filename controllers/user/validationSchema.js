const Joi = require("joi");

module.exports = {
  registerUserBodyValidation: (body) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      age: Joi.number().required(),
      location: Joi.string().required(),
      interests: Joi.array().items(Joi.string()).required(),
      healthConditions: Joi.array().items(Joi.string()).required(),
    });
    return schema.validate(body);
  },
  loginUserBodyValidation: (body) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
