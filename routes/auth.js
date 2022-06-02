const router = require("express").Router();
const users = require("../controllers/users");
const { authenticateSchema } = require("../middlewares/api-data-schema");

router.post("/", authenticateSchema, users.authenticate);

module.exports = router;
