'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Department, {foreignKey: "departmentId"})
      User.hasMany(models.Attendance, {foreignKey: "userId", as: "userAttendance"})
      User.belongsToMany(models.Class, {through: "Attendance", as: "userClass", foreignKey: "userId"})
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name can't be empty"
        },
        notEmpty: {
          msg: "Name can't be an empty string"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Wrong Email Format"
        },
        notNull: {
          msg: "Email can't be empty"
        },
        notEmpty: {
          msg: "Email can't be an empty string"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be empty"
        },
        notEmpty: {
          msg: "password cannot be an empty string"
        },
        isMoreThan4Carracter(value){
          if(value.length < 5){
            throw new Error('Password minimal 5 caracter')
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address can't be empty"
        },
        notEmpty: {
          msg: "Address can't be an empty string"
        }
      }
    },
    placeOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "place of birth can't be empty"
        },
        notEmpty: {
          msg: "place of birth can't be an empty string"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of birth can't be empty"
        },
        notEmpty: {
          msg: "Date of birth can't be an empty string"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role can't be empty"
        },
        notEmpty: {
          msg: "Role can't be an empty string"
        }
      }
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Occupation can't be empty"
        },
        notEmpty: {
          msg: "Occupation can't be an empty string"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone Number can't be empty"
        },
        notEmpty: {
          msg: "Phone Number can't be an empty string"
        }
      }
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Batch can't be empty"
        },
        notEmpty: {
          msg: "Batch can't be an empty string"
        }
      }
    },
    departmentId: DataTypes.INTEGER,
    isLogin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate : (user, options) => {
        user.password = hashingPassword(user.password)
      }
    }
  });
  return User;
};