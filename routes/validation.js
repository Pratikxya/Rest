//VALIDATION
import Joi from "@hapi/joi";

//RegisterValidation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    age: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//LoginValidation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    age: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation };
