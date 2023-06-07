const Joi = require("joi");

module.exports = {
  getGroupChatsBodyValidation: (body) => {
    const schema = Joi.object({
      groupId: Joi.string().required(),
    });
    return schema.validate(body);
  },
  sendMessageBodyValidation: (body) => {
    const schema = Joi.object({
      groupName: Joi.string().required(),
      message: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
