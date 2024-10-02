import User from "../models/Users.mjs";

export async function createUser(req, res) {
  try {
    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente.",
      user: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "El usuario con ese correo ya existe." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

export async function getUserByEmail(req, res) {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
