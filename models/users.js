const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "field required: name" },
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "field required: last_name" },
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "field required: email" },
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: { msg: "field required: password" },
        },
      },
      role: {
        type: Sequelize.DataTypes.ENUM,
        values: ["Admin", "User"],
        defaultValue: "User",
        allowNull: false,
        validate: {
          notNull: { msg: "field required: role" },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hashSync(user.password, 10);
        },
        beforeUpdate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    }
  );

  User.prototype.validPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };

  return User;
};
