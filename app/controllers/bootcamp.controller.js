import {config} from "dotenv";
import { Sequelize } from "sequelize";
config();
import Bootcamp from "../models/bootcamp.model.js";
import User from "../models/user.model.js";
import db from "../config/db.config.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createBootcamp = async (req, res) => {
    try {
        const title = req.body.title;
        const cue = req.body.cue;
        const description = req.body.description;
        const bootcampExiste = await Bootcamp.findOne({
            where: {
                title: title
            }
        }, { logging: false })
        if (!title || !cue || !description) {
            return res.status(404).json({
                message: 'Los campos no pueden estar vacios'
            })
        } else if (bootcampExiste) {
            return res.status(400).json({
                message: 'El bootcamp ya está registrado'
            })
        } else {
            const bootcamp = await Bootcamp.create({
                title: title,
                cue: cue,
                description: description
            })
            res.status(201).json({
                message: bootcamp
            })
        }
    } catch (error) {
        res.status(400).json({message: `Ha ocurrido un error ${error}`})
    }
  
  }



//Agregar un Usuario al Bootcamp llamado addUser.
export const addUser = async (req, res) => {
    const transaction = await db.transaction(); // Inicializa la transacción
    try {
        const userId = req.body.userId;
        const bootcampId = req.body.bootcampId;
        const usuario = await User.findByPk(userId, { transaction, logging: false });
        const bootcamp = await Bootcamp.findByPk(bootcampId, { transaction, logging: false });
        if (!usuario) {
            await transaction.rollback();
            return res.status(404).json({
                message: `No se encontró el usuario con ID ${userId}`
            });
        }
        if (!bootcamp) {
            await transaction.rollback();
            return res.status(404).json({
                message: `No se encontró el bootcamp con ID ${bootcampId}`
            });
        }
        await usuario.addBootcamp(bootcamp, { transaction, logging: false });

        await transaction.commit();
        res.status(200).json({
            message: bootcamp
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(400).json({ message: `Ha ocurrido un error: ${error.message}` });
    }
};

export const findBootcampById = async (req, res) => {
    try {
        const bootcampId = req.body.bootcampId;
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email'],
                through: [],
            },
            logging: false,
        });
        if (!bootcamp) {
            return res.status(404).json({
                message: `No se encontró el bootcamp con ID ${bootcampId}`,
            });
        }
        if (!bootcamp.users || bootcamp.users.length === 0) {
            return res.status(200).json({
                message: `El bootcamp con ID ${bootcampId} no tiene usuarios inscritos.`,
                data: bootcamp,
            });
        }
        return res.status(200).json({
            message: `Detalles del bootcamp con ID ${bootcampId}`,
            data: {
                bootcamp
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: `Ha ocurrido un error: ${error.message}`,
        });
    }
};





export const findAllBootcamp = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email'],
                through: [],
            },
            logging: false,
        });
        if (!bootcamps || bootcamps.length === 0) {
            return res.status(404).json({
                message: 'No hay bootcamps registrados',
            });
        }
        res.status(200).json({
            message: 'Lista de bootcamps obtenida con éxito',
            data: bootcamps
        });
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener los bootcamps: ${error.message}`,
        });
    }
};




