const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { statusCodes } = require("../config/http-status");

exports.customCreateTokenValidationJWT = (req, res, next) => {
  const creationToken = req.headers["custom-authentication-token"];
  if (creationToken) {
    jwt.verify(
      creationToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(statusCodes.UNAUTHORIZED).send({
            error: "Invalid Creation Token",
          });
        }

        //verification of timestamp is not needed since that that token expiration is 5m already
        //due to exam instructions we need to check it anyways
        const allowedTimeDiff = 5 * 60 * 1000; //5 minutes in millis
        const currentTimestamp = Date.now();
        const tokenTimestamp = user.timestamp;

        if (currentTimestamp - tokenTimestamp > allowedTimeDiff) {
          return res.status(statusCodes.UNAUTHORIZED).send({
            error: "Creation Token expired",
          });
        }
        req.user = user;
        next();
      }
    );
  } else {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      error: "Creation Token missing",
    });
  }
};
