const Joi = require("joi");

module.exports = {
  createGroupBodyValidation: (body) => {
    const schema = Joi.object({
      groupName: Joi.string().required(),
      members: Joi.array().required(),
    });
    return schema.validate(body);
  },
  joinGroupBodyValidation: (body) => {
    const schema = Joi.object({
      groupName: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
