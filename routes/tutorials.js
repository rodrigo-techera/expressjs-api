const router = require("express").Router();
const tutorials = require("../controllers/tutorials");
const {
  tutorialsGetTokenSchema,
  tutorialsListAllSchema,
  tutorialsListByIdSchema,
  tutorialsCreateSchema,
  tutorialsUpdateByIdSchema,
  tutorialsMassDeleteSchema,
  tutorialsDeleteByIdSchema,
} = require("../middlewares/api-data-schema");

router.get("/token", tutorialsGetTokenSchema, tutorials.createToken);
router.get("/", tutorialsListAllSchema, tutorials.listAll);
router.get("/:id", tutorialsListByIdSchema, tutorials.listById);

router.post("/", tutorialsCreateSchema, tutorials.create);

router.put("/:id", tutorialsUpdateByIdSchema, tutorials.updateById);

router.delete("/mass_delete", tutorialsMassDeleteSchema, tutorials.deleteAll);
router.delete("/:id", tutorialsDeleteByIdSchema, tutorials.deleteById);

module.exports = router;
