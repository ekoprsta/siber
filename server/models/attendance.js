'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {foreignKey: "userId"})
      Attendance.belongsTo(models.Class, {foreignKey: "classId"})
    }
  }
  Attendance.init({
    attendanceType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "This field can't be empty"
        },
        notEmpty: {
          msg: "This field can't be an empty string"
        }
      }
    },
    attendanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "This field can't be empty"
        },
        notEmpty: {
          msg: "This field can't be an empty string"
        }
      }
    },
    remarks: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};