const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const tutorialsRouter = require("./routes/tutorials");
const { authenticateJWT } = require("./middlewares/authenticate-jwt");

dotenv.config();
const app = express();
const router = express.Router();

router.use("/auth", authRouter);
router.use("/tutorials", authenticateJWT, tutorialsRouter);

// enabling cors too looking ahead having this API accessed from a browser
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());
app.use(express.json());
app.use("/v1", router);

//catch all wildcard to handle 404 on not found resources
app.all("*", function (req, res) {
  return res.status(404).send({
    error: "Resource not found",
  });
});

let server_port = process.env.SERVER_PORT;
app.listen(server_port, () => {
  console.log(`Rest API Application Challenge started on port ${server_port}`);
});