import User from "../models/Users.mjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { name, lastName, email, password } = req.body;

    // Validación básica
    if (!name || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }

    const newUser = new User({ name, lastName, email, password });

    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    if (error.code === 11000) {
      res.status(409).json({ message: "El usuario con ese correo ya existe." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email en la DB
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Validar la contraseña
    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Crear el token JWT
    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function findUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
}

function generateToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
}
