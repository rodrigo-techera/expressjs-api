module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorials", {
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "field required: title" },
      },
    },
    videoUrl: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    publishedStatus: {
      type: Sequelize.DataTypes.ENUM,
      values: ["deleted", "published"],
      defaultValue: "published",
    },
    deletedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
  });

  return Tutorial;
};
