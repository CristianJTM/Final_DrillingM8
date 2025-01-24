
import { config } from "dotenv";
config();

import { Sequelize } from "sequelize";

const {USER,HOST,DATABASE,PASSWORD,PORT_BD} = process.env;

const db = new Sequelize(
    DATABASE,
    USER,
    PASSWORD,
    {
        host: HOST,
        port: PORT_BD,
        dialect: 'postgres'
    }
);

export default db;