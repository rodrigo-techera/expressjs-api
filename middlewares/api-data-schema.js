const { body, query, validationResult } = require("express-validator");
const {
  customCreateTokenValidationJWT,
} = require("./custom-create-token-validation");

const ALLOWED_SORT_FIELDS = ["id", "title", "updatedAt"];
const ALLOWED_SORT_VALUES = ["ASC", "DESC"];

const validateParams = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    //validation errors ocurred
    console.log("errors.errors", errors.errors);
    return res.status(400).send({
      //bad Request
      error: errors.errors[0].msg,
    });
  }

  next();
};

const isAdminRole = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }

  return res.status(401).send({
    //bad Request
    error: "invalid role",
  });
};

exports.authenticateSchema = [
  body("email").exists().withMessage("email field is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("email").normalizeEmail(),
  body("password").exists().withMessage("password field is required"),
  body("password").trim().escape(),
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
  body("id").not().isNumeric().withMessage("Invalid id"),
  validateParams,
];

exports.tutorialsCreateSchema = [
  customCreateTokenValidationJWT,
  isAdminRole,
  body("title").exists().withMessage("title field is required"),
  body("title").trim().escape(),
  body("title").not().isEmpty().withMessage("title field cannot be empty"),
  body("videoUrl")
    .optional()
    .not()
    .isURL()
    .withMessage("videoUrl field should be a valid url"),
  body("description").trim().escape(),
  validateParams,
];

exports.tutorialsUpdateByIdSchema = [
  isAdminRole,
  //not needed to check if id exists because it is part of the route
  body("id").not().isNumeric().withMessage("Invalid id"),
  body("title").trim().escape(),
  body("videoUrl")
    .trim()
    .escape()
    .isURL()
    .withMessage("videoUrl field should be a valid url"),
  body("description").trim().escape(),
  validateParams,
];

exports.tutorialsMassDeleteSchema = [isAdminRole];

exports.tutorialsDeleteByIdSchema = [
  isAdminRole,
  //not needed to check if id exists because it is part of the route
  body("id").not().isNumeric().withMessage("Invalid id"),
  validateParams,
];
