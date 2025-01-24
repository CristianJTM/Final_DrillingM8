# Proyecto Final - Drilling 8

## Descripción
Este proyecto es parte del módulo 8 del bootcamp y tiene como objetivo aplicar los conocimientos adquiridos en las sesiones anteriores. El proyecto consiste en [descripción breve del proyecto].

## Uso
Se instalar los paquetes necesarios con:

npm i

Crear el archivo .env con los datos de la base de datos, y la palabra secreta para la creacion del token:

USER=
HOST=
DATABASE=
PASSWORD=
PORT_DB=
PORT=
SECRET=

Para ejecutar el proyecto, utilice el siguiente comando:

node server.js


## Pruebas
Las pruebas se realzaran a traves de postman con los siguientes datos por las rutas que corresponden
### Crear usuario
```json
{
    "firstName": "Mateo",
    "lastName": "Díaz",
    "email": "mateo.diaz@correo.com",
    "password": "mateo123456"
}

{
    "firstName": "Santiago",
    "lastName": "Mejías",
    "email": "santiago.mejias@correo.com",
    "password": "santiago123456"
}

{
    "firstName": "Lucas",
    "lastName": "Rojas",
    "email": "lucas.rojas@correo.com",
    "password": "lucas123456"
}

{
    "firstName": "Facundo",
    "lastName": "Fernández",
    "email": "facundo.fernandez@correo.com",
    "password": "facundo123456"
}
```

### Crear bootcamp
```json
{
    "title": "Introduciendo El Bootcamp de React",
    "cue": 10,
    "description": "React es la librería más usada en JavaScript para el desarrollo de interfaces"
}

{
    "title": "Bootcamp Desarrollo Web Full Stack",
    "cue": 12,
    "description": "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS"
}

{
    "title": "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
    "cue": 18,
    "description": "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e integrarlos con modelos avanzados de Artificial Intelligence y Machine Learning"
}
```

