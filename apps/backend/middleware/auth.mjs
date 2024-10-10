import jwt from "jsonwebtoken";
import User from "../models/Users.mjs";

export async function authenticateToken(req, res, next) {
  // List of routes that don't require authentication
  const openRoutes = ["/login", "/register"];

  // Check if the current route is in the openRoutes array
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
