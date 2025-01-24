import db from "../config/db.config.js";

const User = db.user;

export const checkDuplicateEmail = async (req, res, next) => {
  try {
    
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar datos de registro' });
  }
};

