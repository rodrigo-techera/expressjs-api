const { dbConn } = require("../models");
const jwt = require("jsonwebtoken");
const { statusCodes } = require("../config/http-status");
const dotenv = require("dotenv");
dotenv.config();

const User = dbConn.users;

const findOne = async (email, plainPassword) => {
  return await User.findOne({ where: { email } }).then(async (data) => {
    if (data?.dataValues?.password) {
      if (await data.validPassword(plainPassword, data.dataValues.password)) {
        return data.dataValues;
      }
    }

    return false;
  });
};

exports.authenticate = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    //Find user by email and compare the password
    findOne(email, password).then((user) => {
      //If user returned: email and password matched
      if (user) {
        const accessToken = jwt.sign(
          { email: user.email, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20m" } // 20 minutes for expiration
        );
        res.json({ accessToken });
      } else {
        //email or password didn't match
        return res.status(statusCodes.UNAUTHORIZED).send({
          error: "Invalid credentials",
        });
      }
    });
  } else {
    //email or password empty
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      error: "Empty credentials",
    });
  }
};
