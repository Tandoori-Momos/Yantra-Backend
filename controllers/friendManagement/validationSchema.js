const Joi = require("joi");

module.exports = {
  addFriendBodyValidation: (body) => {
    const schema = Joi.object({
      username: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
