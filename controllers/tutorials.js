const { dbConn } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { statusCodes } = require("../config/http-status");

const Op = dbConn.Sequelize.Op;
const Tutorial = dbConn.tutorials;

exports.createToken = (req, res) => {
  const createAuthenticationToken = jwt.sign(
    {
      email: req.user.email,
      role: req.user.role,
      timestamp: Date.now(),
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" } // 5 minutes for expiration
  );
  res.json({ createAuthenticationToken });
};

exports.listAll = (req, res) => {
  let conditions = {
    publishedStatus: "published",
  };

  let sort = [];

  if ("filter_by_title" in req.query && req.query.filter_by_title) {
    //adding condition to filter by title
    conditions.title = { [Op.like]: `%${req.query.filter_by_title}%` };
  }

  if ("filter_by_description" in req.query && req.query.filter_by_description) {
    conditions.description = {
      //adding condition to filter by description
      [Op.like]: `%${req.query.filter_by_description}%`,
    };
  }

  //doesnt require sanitize or check value since was already filtered by middlewares
  if ("sort_by_field" in req.query && req.query.sort_by_field) {
    let sortBy = req.query.sort_by ?? "ASC";

    sort.push([req.query.sort_by_field, sortBy]);
  }

  Tutorial.findAll({
    where: conditions,
    order: sort,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error occurred listing Tutorials",
      });
    });
};

exports.listById = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        return res.status(statusCodes.NOT_FOUND).send({
          error: "Tutorial not found",
        });
      }
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error occurred retrieving Tutorial",
      });
    });
};

exports.create = (req, res) => {
  // "title" only is required here since that "publishedStatus" has a deafult value
  // encapsulating the values inside "data" object we prevent unexpected fields to be sent for creation
  const data = {
    title: req.body.title,
    videoUrl: req.body.videoUrl || null,
    description: req.body.description || null,
  };

  // Save Tutorial in the database
  Tutorial.create(data)
    .then((data) => {
      res.status(statusCodes.CREATED).send(data);
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error ocurred while creating Tutorial",
      });
    });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  const newData = {};

  // Checking if the keys are present on the request body just to update only the ones are sent
  // Also in this way the data si allowing only those keys preventing other keys being updated
  if ("title" in req.body) newData.title = req.body.title;
  if ("videoUrl" in req.body) newData.videoUrl = req.body.videoUrl;
  if ("description" in req.body) newData.description = req.body.description;

  //checking first if tutorial exists to return the correct HTTP status code
  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        Tutorial.update(newData, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Tutorial was updated successfully",
              });
            } else {
              return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
                error: "Tutorial was not updated",
              });
            }
          })
          .catch((err) => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
              error: "An error ocurred while updating Tutorial",
            });
          });
      } else {
        return res.status(statusCodes.NOT_FOUND).send({
          error: "Tutorial not found",
        });
      }
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error ocurred retrieving Tutorial",
      });
    });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;

  //checking first if tutorial exists to return the correct HTTP status code
  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        //Just logical delete by changing the attribute "publishedStatus" to "deleted"
        Tutorial.update(
          { publishedStatus: "deleted", deletedAt: new Date() },
          { where: { id: id } }
        )
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Tutorial was deleted successfully",
              });
            } else {
              return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
                error: "An error ocurred while deleting Tutorial",
              });
            }
          })
          .catch((err) => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
              error: "An error ocurred while deleting Tutorial",
            });
          });
      } else {
        return res.status(statusCodes.NOT_FOUND).send({
          error: "Tutorial not found",
        });
      }
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error occurred retrieving Tutorial",
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.update(
    { publishedStatus: "deleted", deletedAt: new Date() },
    { where: {} }
  )
    .then((num) => {
      if (num >= 1) {
        res.send({
          message: "Tutorials were deleted successfully",
        });
      } else {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
          error: "An error ocurred while deleting Tutorials",
        });
      }
    })
    .catch((err) => {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
        error: "An error ocurred while deleting Tutorials",
      });
    });
};
