import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { index } from "./app/models/index.js";
// import { createUser, findUserById, findAllUsers, updateUserById, deleteUserById } from "./app/controllers/user.controller.js";
// import { createBootcamp, addUser, findById, findAllBootcamp } from "./app/controllers/bootcamp.controller.js";

import userRouter from './app/routes/user.routes.js';
import bootcampRouter from './app/routes/bootcamp.routes.js';

config()
await index();
const app = express();
const {PORT} = process.env;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//LLamado a las rutas
app.use(userRouter, bootcampRouter);

//Levantar el servidor
app.listen(PORT,()=>console.log(`Servidor escuchando en http://localhost:${PORT}`));

// {"firstName":"Mateo","lastName":"Díaz","email":"mateo.diaz@correo.com","password":"mateo123456"}
// {"firstName":"Santiago","lastName":"Mejías","email":"santiago.mejias@correo.com","password":"santiago123456"}
// {"title":"Introduciendo El Bootcamp De React","cue":10,"description":"React es la librería más usada en JavaScript para el desarrollo de interfaces"}
// {"title":"Bootcamp Desarrollo Web Full Stack.","cue":12,"description":"Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular,MongoDB, ExpressJS."}
// {"title":"Bootcamp Big Data, Inteligencia Artificial & Machine Learning.","cue":18,"description":"Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."}
// {"idUser":1,"idBootcamp":1}


// const main = async () => {
//     await index();

//     const newUser1 = await createUser("Mateo", "Díaz", "mateo.diaz@correo.com","mateo123456");
//     const newUser2 = await createUser("Santiago", "Mejías", "santiago.mejias@correo.com", "santiago123456");
//     const newUser3 = await createUser("Lucas", "Rojas", "lucas.rojas@correo.com", "lucas123456");
//     const newUser4 = await createUser("Facundo", "Fernandez", "facundo.fernandez@correo.com", "facundo123456");

//     console.log(JSON.stringify(newUser1, null, 2));
//     console.log(JSON.stringify(newUser2, null, 2));
//     console.log(JSON.stringify(newUser3, null, 2));
//     console.log(JSON.stringify(newUser4, null, 2));

//     const newBootcamp1 = await createBootcamp("Introduciendo El Bootcamp De React", 10, "React es la librería más usada en JavaScript para el desarrollo de interfaces");
//     const newBootcamp2 = await createBootcamp("Bootcamp Desarrollo Web Full Stack.", 12, "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular,MongoDB, ExpressJS.");
//     const newBootcamp3 = await createBootcamp("Bootcamp Big Data, Inteligencia Artificial & Machine Learning.", 18, "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.");

//     console.log(JSON.stringify(newBootcamp1, null, 2));
//     console.log(JSON.stringify(newBootcamp2, null, 2));
//     console.log(JSON.stringify(newBootcamp3, null, 2));

//     addUser(1, 1);
//     addUser(2, 1);
//     addUser(1, 2);
//     addUser(1, 3);
//     addUser(2, 3);
//     addUser(3, 3);
//     Consultas

//     Para ejecutar las consultas quitar los comentarios y luego ejecute el server node server.js.

//     //Consultando el Bootcamp por id, incluyendo los usuarios
//     findById(1);
//     findById(2);
//     findById(3);

//     //Listar todos los Bootcamp con sus usuarios.
//     findAllBootcamp();

//     //Consultar un usuario por id, incluyendo los Bootcamp
//     findUserById(1);
//     findUserById(2);
//     findUserById(3);
//     findUserById(4);

//     //Listar los usuarios con sus Bootcamp.
//     findAllUsers();

//     //Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.
//     updateUserById("1", "Pedro", "Sánchez","pedro.sanchez@correo.com");

//     //Eliminar un usuario por id; por ejemplo: el usuario con id=1.
//     deleteUserById("1");

// }
// main();