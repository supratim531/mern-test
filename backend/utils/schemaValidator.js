const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validateAuthBody = authBody => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(60).alphanum().required().label("Username"),
    password: passwordComplexity().required().label("Password")
  });

  return schema.validate(authBody);
}

const validateEmployeeBody = employeeBody => {
  const schema = Joi.object({
    f_Image: Joi.string().required().label("Image"),
    f_Name: Joi.string().min(4).max(255).regex(/^[a-zA-Z\s]+$/).required().label("Name").messages({
      "string.min": "Name must have atleast 4 characters",
      "string.max": "Name cannot have more than 255 characters",
      "string.empty": "Name cannot be empty",
      "string.pattern.base": "Name can contain only A to Z and a to z including spaces"
    }),
    f_Email: Joi.string().email().required().label("Email"),
    f_Mobile: Joi.string().regex(/^\d{10}$/).required().label("Mobile").messages({
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number should have 10 digits"
    }),
    f_Designation: Joi.string().valid("HR", "Manager", "sales").label("Designation"),
    f_gender: Joi.string().valid("M", "F").label("Gender"),
    f_Course: Joi.string().valid("MCA", "BCA", "BSC").label("Course")
  });

  return schema.validate(employeeBody);
}

module.exports = {
  validateAuthBody,
  validateEmployeeBody
};
