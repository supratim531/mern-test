const jwt = require("jsonwebtoken");

const generateToken = payload => {
  const accessToken = jwt.sign(
    payload,
    process.env.SECRET_KEY,
    {
      expiresIn: "15m"
    }
  );

  return accessToken;
}

module.exports = {
  generateToken
};
