const Joi = require("joi");

module.exports = {
  sendIndividualMessageBodyValidation: (body) => {
    const schema = Joi.object({
      friendName: Joi.string().required(),
      message: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
