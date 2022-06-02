const { dbConn } = require("../models");

// Test db connection
try {
  dbConn.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
