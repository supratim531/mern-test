const {
  FORBIDDEN,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require("../constants");

const handleError = (err, req, res, next) => {
  console.log("handleError.js:", err.name, { err });

  switch (err.name) {
    case "TokenExpiredError":
      res.status(FORBIDDEN.code).json({
        error: true,
        status: FORBIDDEN.code,
        title: FORBIDDEN.title,
        message: err.message,
        expiredAt: err?.expiredAt
      });
      break;
    case "JsonWebTokenError":
      res.status(BAD_REQUEST.code).json({
        error: true,
        status: BAD_REQUEST.code,
        title: BAD_REQUEST.title,
        message: err.message
      });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(BAD_REQUEST.code).json({
        error: true,
        status: BAD_REQUEST.code,
        title: BAD_REQUEST.title,
        message: err.message
      });
      break;
    case "Error":
      let statusCode = res.statusCode;
      let statusMessage = res.statusMessage;

      if (!statusMessage) {
        statusCode = INTERNAL_SERVER_ERROR.code;
        statusMessage = INTERNAL_SERVER_ERROR.title;
      }

      res.status(statusCode).json({
        error: true,
        status: statusCode,
        title: statusMessage,
        message: err.message
      });
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR.code).json({
        error: true,
        status: INTERNAL_SERVER_ERROR.code,
        title: INTERNAL_SERVER_ERROR.title,
        message: err.message
      });
      break;
  }
}

module.exports = handleError;
