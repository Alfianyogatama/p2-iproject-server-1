'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require('./../helpers/bcrypt')
const generateChatId = require('./../helpers/uniqueId')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Name is required",
        },
        notNull : {
          msg: "Name cannot null"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Email is required",
        },
        notNull : {
          msg: "Email cannot null"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Image is required",
        },
        notNull : {
          msg: "Image Url cannot null"
        },
        isUrl: {
          msg : "Invalid Url"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Gender is required",
        },
        notNull : {
          msg: "Gender Url cannot null"
        },
        isIn : ['male', 'female']
      }
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: 'Indonesia',
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Coountry is required",
        },
        notNull : {
          msg: "Country Url cannot null"
        },
      }
    },
    chatId: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Password is required",
        },
        notNull : {
          msg: "Password cannot null"
        }, 
      }
    }
  }, {
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPass(user.password)
        user.chatId = generateChatId()
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};