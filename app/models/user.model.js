import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.config.js";
import Bootcamp from "./bootcamp.model.js";

const User = db.define('user',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email : {
        type: DataTypes.STRING(50),
        allowNull : false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }

})

Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp'
});
User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp'
});
export default User;