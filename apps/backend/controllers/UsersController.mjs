import User from "../models/Users.mjs";
import jwt from "jsonwebtoken";

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * Esta función recibe los datos necesarios para crear un nuevo usuario (nombre, apellido, correo electrónico y contraseña),
 * valida estos datos y, si son correctos, crea el usuario en la base de datos. Si ya existe un usuario con el mismo correo
 * electrónico, retorna un error. También valida que el correo electrónico tenga el formato adecuado.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos enviados por el cliente.
 * @param {object} req.body - El cuerpo de la solicitud que contiene la información del usuario.
 * @param {string} req.body.name - El nombre del usuario.
 * @param {string} req.body.lastName - El apellido del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con el estado de la creación del usuario.
 *
 * @example
 * // Ejemplo de uso de la función createUser
 * app.post("/register", createUser);
 */
export async function createUser(req, res) {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

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

/**
 * Permite a un usuario iniciar sesión proporcionando su correo electrónico y contraseña.
 *
 * Esta función busca al usuario en la base de datos mediante su correo electrónico. Si el usuario existe, se valida
 * la contraseña proporcionada. Si la contraseña es correcta, se genera un token JWT para autenticar al usuario
 * en futuras solicitudes. En caso de error, se retorna un mensaje adecuado.
 *
 * @param {object} req - El objeto de solicitud que contiene los datos de inicio de sesión (correo y contraseña).
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con el token y los detalles del usuario si el inicio de sesión es exitoso.
 *
 * @example
 * // Ejemplo de uso de la función login
 * app.post("/login", login);
 */
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

/**
 * Busca un usuario en la base de datos por su correo electrónico.
 *
 * Esta función recibe un correo electrónico y busca al usuario correspondiente en la base de datos.
 * Si no se encuentra un usuario con ese correo, retorna null.
 *
 * @param {string} email - El correo electrónico del usuario que se desea buscar.
 *
 * @returns {Promise<object|null>} - Retorna una promesa que se resuelve con el usuario encontrado o null si no existe.
 *
 * @example
 * // Ejemplo de uso de la función findUserByEmail
 * const user = await findUserByEmail('juan.perez@example.com');
 * if (user) {
 *   console.log(user.name);
 * }
 */
async function findUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
}

/**
 * Genera un token JWT para un usuario.
 *
 * Esta función toma un objeto de usuario y genera un token JWT que puede ser usado para autenticar al usuario
 * en futuras solicitudes. El token tiene una validez de 24 horas (86400 segundos).
 *
 * @param {object} user - El usuario para el que se generará el token.
 * @param {string} user.id - El ID del usuario que será codificado en el token.
 *
 * @returns {string} - Retorna el token JWT generado.
 *
 * @example
 * // Ejemplo de uso de la función generateToken
 * const token = generateToken(user);
 * console.log(token);
 */
function generateToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
}
