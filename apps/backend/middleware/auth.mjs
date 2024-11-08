import jwt from "jsonwebtoken";
import User from "../models/Users.mjs";

/**
 * Middleware para autenticar el token de acceso en las rutas protegidas.
 *
 * Este middleware verifica si el token de autenticación está presente y es válido. Si el token es válido,
 * se extrae la información del usuario del token y se adjunta al objeto `req` para que esté disponible
 * en las siguientes etapas del ciclo de vida de la solicitud. Si el token es inválido o ha expirado, se retorna un error.
 * También permite el acceso a las rutas abiertas como "/login" y "/register" sin necesidad de autenticación.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos de la solicitud HTTP.
 * @param {object} res - El objeto de respuesta, que se utiliza para enviar la respuesta HTTP al cliente.
 * @param {function} next - La función que pasa el control al siguiente middleware o manejador de ruta.
 *
 * @returns {void} - Si la autenticación es exitosa, se pasa al siguiente middleware. Si no, se retorna un error.
 *
 * @example
 * // Uso del middleware authenticateToken en una ruta protegida
 * app.get("/profile", authenticateToken, (req, res) => {
 *   res.json({ message: "Perfil del usuario", user: req.user });
 * });
 */
export async function authenticateToken(req, res, next) {
  const openRoutes = ["/login", "/register"];

  if (openRoutes.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Se requiere un token de autenticación." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }
    res.status(500).json({ message: "Error en la autenticación." });
  }
}
