const bcrypt = require("bcrypt");
const Login = require("../models").login;
const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/tokenGenerator");
const { validateAuthBody } = require("../utils/schemaValidator");
const {
  BAD_REQUEST
} = require("../constants");

/**
 * @desc User login
 * @route POST /api/v1/auth/login
 */
const login = expressAsyncHandler(async (req, res) => {
  const payload = req?.body;
  const validationError = validateAuthBody(payload);

  if (validationError.error) {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error(validationError.error.details[0].message);
  }

  const user = await Login.findOne({ where: { f_userName: payload?.username } });

  if (user && (await bcrypt.compare(payload?.password, user?.dataValues?.f_Pwd))) {
    const accessToken = generateToken({
      user: {
        username: user?.dataValues?.f_userName
      }
    });

    return res.status(200).json({
      message: `${payload?.username} logged in successfully`,
      accessToken
    });
  } else {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error("Wrong username or password");
  }
});

/**
 * @desc New user registration
 * @route POST /api/v1/auth/register
 */
const register = expressAsyncHandler(async (req, res) => {
  const payload = req?.body;
  const validationError = validateAuthBody(payload);

  if (validationError.error) {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error(validationError.error.details[0].message);
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(payload?.password, salt);
  await Login.create({ ...payload, f_userName: payload?.username, f_Pwd: hashedPassword });

  return res.status(201).json({
    message: `Account created successfully for user ${payload?.username}`
  });
});

/**
 * @desc Get current authorized user
 * @route GET /api/v1/auth/current
 */
const current = expressAsyncHandler(async (req, res) => {
  return res.status(200).json({
    user: req?.user
  });
});

module.exports = {
  login,
  current,
  register
};
