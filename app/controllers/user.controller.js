import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import Bootcamp from "../models/user.model.js";
import db from "../config/db.config.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;

//Crear y guardar usuarios llamado createUser
export const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 10);
        const usuarioExiste = await User.findOne({
            where: {
                email: email
            }
        })
        if (!firstName || !lastName || !email || !password) {
            return res.status(404).json({
                message: 'Los campos no pueden estar vacios'
            })
        } else if (usuarioExiste) {
            return res.status(400).json({
                message: 'El usuario ya está registrado'
            })
        } else {
            const usuario = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            res.status(201).json({
                message: usuario
            })
        }
    } catch (error) {
        res.status(400).json({ message: `Ha ocurrido un error ${error}` })
    }

}

export const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usuario = await User.findOne({
            where: { email: email }
        })
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        } else {
            const contrasenaValida = await bcrypt.compare(password, usuario.password);
            if (!contrasenaValida) {
                return res.status(400).json({
                    message: 'Contraseña incorrecta'
                })
            } else {
                const payload = {
                    email: email,
                    exp: Date.now() / 1000 + 60 * 60
                }
                const token = jwt.sign(payload, SECRET);
                res.cookie('jwt', token,{maxAge: Date.now()/1000+60*60})
                res.status(200).json({
                    message: usuario,
                    token: token
                })
            }
        }
    } catch (error) {
        res.status(400).json({ message: `Ha ocurrido un error ${error}` })
    }
}



//Obtener los Bootcamp de un usuario llamado findUserById.
export const findUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({
                message: `No se encontró el usuario con ID ${userId}`
            })
        }
        const bootcamps = await usuario.getBootcamps();
        if (bootcamps.length === 0) {
            return res.status(200).json({
                message: `El usuario ${usuario.firstName} ${usuario.lastName} no tiene bootcamps registrados`
            })
        } else {
            return res.status(200).json({
                message: `Bootcamps del usuario ${usuario.firstName} ${usuario.lastName}:`,
                bootcamps: bootcamps
            })
        }
    } catch (error) {
        res.status(400).json({ message: `Ha ocurrido un error ${error}` })
    }
}

export const findAllUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        
        if (usuarios.length === 0) {
            return res.status(200).json({
                message: 'No hay usuarios registrados'
            });
        }
        
        const usuariosConBootcamps = [];
        
        for (const usuario of usuarios) {
            const bootcamps = await usuario.getBootcamps();
            
            usuariosConBootcamps.push({
                usuario: `${usuario.firstName} ${usuario.lastName}`,
                bootcamps: bootcamps.length > 0 ? bootcamps : 'No tiene bootcamps registrados'
            });
        }
        
        return res.status(200).json({
            message: 'Usuarios encontrados',
            data: usuariosConBootcamps
        });
    } catch (error) {
        return res.status(400).json({ message: `Ha ocurrido un error: ${error.message}` });
    }
};


//Actualizar usuario por Id llamado updateUserById.
export const updateUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        let usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({
                message: `No se encontró el usuario con ID ${userId}`
            })
        }
        const userToUpdate = await User.update({
            firstName: firstName,
            lastName: lastName
        }, {
            where: { id: userId },
            returning: true
        })
        usuario = await User.findByPk(userId);
        return res.status(200).json({
            message: usuario
        })
    }catch(error){
        res.status(400).json({ message: `Ha ocurrido un error ${error}` })
    }

}

export const deleteUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({
                message: `No se encontró el usuario con ID ${userId}`
            })
        }
        await usuario.destroy();
        return res.status(200).json({
            message: `Usuario con ID ${userId} eliminado correctamente`
        })
    }catch(error){
        res.status(400).json({ message: `Ha ocurrido un error ${error}` })
    }
}
