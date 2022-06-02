const { dbConn } = require("../models");
const userData = require("../data/users.json");

//destroying current tables and recreating models
dbConn.sequelize.sync({ force: true }).then(() => {
  console.log("Tables Created, inserting example data...");

  //Inserting example users on the database
  dbConn.users.sync().then(() => {
    userData.forEach((user) => dbConn.users.create({ ...user }));
  });
});
