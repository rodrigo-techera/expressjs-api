const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.sendStatus(401); //Unauthorized
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};
