import { config } from "dotenv";
config();

const authConfig = {
  secret: process.env.SECRET || "No se ha definido la clave secreta",
};

export default authConfig;
