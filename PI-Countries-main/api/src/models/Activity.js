const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isNumeric: true,
        isInt: true,
      },
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Summer", "Autumn", "Winter", "Spring"]],
      },
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 0,
        isNumeric: true,
      },
    },
  });
};
