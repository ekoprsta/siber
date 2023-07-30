'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.Attendance, {foreignKey: "classId", as: "classAttendance", onDelete: 'CASCADE'})
      Class.belongsToMany(models.User, {through: "Attendance", as: "classUser", foreignKey: "classId", onDelete: 'CASCADE'})
    }
  }
  Class.init({
    className: {
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
    pembicara: {
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
    classType: {
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
    date: {
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
    time: {
      type: DataTypes.TIME,
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
    flyer: {
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
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};