const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.customCreateTokenValidationJWT = (req, res, next) => {
  const creationToken = req.headers["custom-authentication-token"];
  if (creationToken) {
    jwt.verify(
      creationToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(401).send({
            //Unauthorized
            error: "Invalid Creation Token",
          });
        }

        //verification of timestamp is not needed since that that token expiration is 5m already
        //due to exam instructions we need to check it anyways
        const timeDiff = 5 * 60; //5 minutes
        const currentTimestamp = Date.now();
        const tokenTimestamp = user.timestamp;
        if (currentTimestamp - tokenTimestamp > timeDiff) {
          return res.status(401).send({
            //Unauthorized
            error: "Creation Token expired",
          });
        }
        req.user = user;
        next();
      }
    );
  } else {
    return res.status(401).send({
      //Unauthorized
      error: "Creation Token missing",
    });
  }
};
