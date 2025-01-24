import db from "../config/db.config.js";

export const index = async () => {
    try {
        await db.authenticate();
        console.log("La conexión a la base de datos fue exitosa");
        await db.sync({ force: true })
        console.log("Se creo la tabla de manera correcta");
    } catch (error) {
        console.error(error);
    }
}