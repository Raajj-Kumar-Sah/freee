import Joi from 'joi';

// User schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'educator', 'admin').default('student')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Course schemas (example)
export const createCourseSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid('Development', 'Business', 'Design', 'Marketing', 'IT').required()
});

// Reuse in controllers
export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

export default validate;

