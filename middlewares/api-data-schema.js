const { body, query, check, validationResult } = require("express-validator");
const {
  customCreateTokenValidationJWT,
} = require("./custom-create-token-validation");
const { isValidHttpUrl } = require("../utils/checks");
const { statusCodes } = require("../config/http-status");

const ALLOWED_SORT_FIELDS = ["id", "title", "updatedAt"];
const ALLOWED_SORT_VALUES = ["ASC", "DESC"];

const validateParams = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    //validation errors ocurred
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      error: errors.errors[0].msg,
    });
  }

  next();
};

const isAdminRole = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }

  return res.status(statusCodes.UNAUTHORIZED).send({
    error: "invalid role",
  });
};

exports.authenticateSchema = [
  check("email").exists().withMessage("email field is required"),
  check("email").isString().withMessage("email field must be a string"),
  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("email field cannot be empty"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password").exists().withMessage("password field is required"),
  check("password").isString().withMessage("password field must be a string"),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("password field cannot be empty"),
  validateParams,
];

exports.tutorialsGetTokenSchema = [isAdminRole];

exports.tutorialsListAllSchema = [
  query("filter_by_title").optional().trim().escape(),
  query("filter_by_description").optional().trim().escape(),
  query("sort_by_field")
    .optional()
    .trim()
    .escape()
    .isIn(ALLOWED_SORT_FIELDS)
    .withMessage("Invalid sort_by_field value"),
  query("sort_by")
    .optional()
    .trim()
    .escape()
    .isIn(ALLOWED_SORT_VALUES)
    .withMessage("Invalid sort_by value"),
  validateParams,
];
exports.tutorialsListByIdSchema = [
  isAdminRole,
  //not needed to check if id exists because it is part of the route
  check("id").trim().isInt().withMessage("id must be a number"),
  validateParams,
];

exports.tutorialsCreateSchema = [
  customCreateTokenValidationJWT,
  isAdminRole,
  check("title").isString().withMessage("title field must be a string"),
  check("title")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("title field cannot be empty"),
  check("videoUrl")
    .optional()
    .trim()
    .custom((value) => {
      /*
      // Looks like validator.isURL has a bug and is not validating well
      // As alternative, a validator for urls was created to don't waste time debugging validator.isURL
      return value === ""
        ? true
        : validator.not().isURL(value, {
            protocols: ["http", "https"],
            allow_underscores: true,
          });
      */
      return value === "" ? true : isValidHttpUrl(value);
    }) //allow empty value as well
    .withMessage("videoUrl field must be a valid url"),
  check("description")
    .optional()
    .isString()
    .withMessage("description field must be a string"),
  check("description").trim().escape(),
  validateParams,
];

exports.tutorialsUpdateByIdSchema = [
  isAdminRole,
  //not needed to check if id exists because it is part of the route
  check("id").trim().isInt().withMessage("id must be a number"),
  check("title")
    .optional()
    .isString()
    .withMessage("title field must be a string"),
  check("title")
    .optional()
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("title field cannot be empty"),
  check("videoUrl")
    .optional()
    .trim()
    .custom((value) => {
      /*
      // Looks like validator.isURL has a bug and is not validating well
      // As alternative, a validator for urls was created to don't waste time debugging validator.isURL
      return value === ""
        ? true
        : validator.isURL(value, {
            protocols: ["http", "https"],
            allow_underscores: true,
          });
      */
      return value === "" ? true : isValidHttpUrl(value);
    }) //allow empty value as well
    .withMessage("videoUrl field must be a valid url"),
  check("description")
    .optional()
    .isString()
    .withMessage("description field must be a string"),
  check("description").trim().escape(),
  validateParams,
];

exports.tutorialsMassDeleteSchema = [isAdminRole];

exports.tutorialsDeleteByIdSchema = [
  isAdminRole,
  //not needed to check if id exists because it is part of the route
  check("id").trim().isInt().withMessage("id must be a number"),
  validateParams,
];
