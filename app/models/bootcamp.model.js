import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.config.js";


const Bootcamp = db.define('bootcamp',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 18
        }
    },
    description : {
        type: DataTypes.STRING(250),
        allowNull : false
    } 
})


export default Bootcamp;