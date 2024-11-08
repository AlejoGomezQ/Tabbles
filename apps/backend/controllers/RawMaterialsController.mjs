import RawMaterial from "../models/RawMaterials.mjs";
import User from "../models/Users.mjs";

/**
 * Crea una nueva materia prima y la asocia a un usuario.
 *
 * Esta función crea un nuevo objeto de materia prima en la base de datos. Luego, se asocia a un usuario
 * mediante el campo `user` y se agrega la referencia de la nueva materia prima a la lista de materias primas del usuario.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos enviados por el cliente.
 * @param {object} req.body - El cuerpo de la solicitud con la información de la nueva materia prima.
 * @param {string} req.body.name - El nombre de la materia prima.
 * @param {string} req.body.description - La descripción de la materia prima.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con el estado de la creación de la materia prima.
 *
 * @example
 * // Ejemplo de uso de la función createRawMaterial
 * app.post("/raw-materials", authenticateToken, createRawMaterial);
 */
export async function createRawMaterial(req, res) {
  try {
    const userId = req.user.id;
    const newRawMaterial = new RawMaterial({
      ...req.body,
      user: userId,
    });

    await newRawMaterial.save();

    await User.findByIdAndUpdate(userId, {
      $push: { rawMaterials: newRawMaterial._id },
    });

    res.status(201).json({
      message: "Materia prima creado exitosamente.",
      RawMaterial: newRawMaterial,
    });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "Ya tienes una materia prima con ese nombre." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Obtiene todas las materias primas asociadas al usuario autenticado.
 *
 * Esta función obtiene todas las materias primas que están asociadas al usuario que realiza la solicitud,
 * utilizando el ID del usuario presente en `req.user.id`.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos del usuario autenticado.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con la lista de materias primas.
 *
 * @example
 * // Ejemplo de uso de la función getAllRawMaterials
 * app.get("/raw-materials", authenticateToken, getAllRawMaterials);
 */
export async function getAllRawMaterials(req, res) {
  try {
    const userId = req.user.id;
    const RawMaterials = await RawMaterial.find({ user: userId });

    res.json(RawMaterials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Obtiene una materia prima específica por su ID.
 *
 * Esta función busca una materia prima en la base de datos usando su ID y asegurándose de que pertenezca al usuario autenticado.
 * Si no se encuentra la materia prima, retorna un error.
 *
 * @param {object} req - El objeto de solicitud, que contiene el ID de la materia prima en `req.params.id`.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con la materia prima solicitada.
 *
 * @example
 * // Ejemplo de uso de la función getRawMaterialById
 * app.get("/raw-materials/:id", authenticateToken, getRawMaterialById);
 */
export async function getRawMaterialById(req, res) {
  try {
    const userId = req.user.id;
    const rawMaterial = await RawMaterial.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!rawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Actualiza los datos de una materia prima específica.
 *
 * Esta función actualiza una materia prima existente en la base de datos, buscando primero por el ID
 * de la materia prima y asegurándose de que pertenezca al usuario autenticado.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos actualizados de la materia prima en `req.body`.
 * @param {string} req.params.id - El ID de la materia prima a actualizar.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con la materia prima actualizada.
 *
 * @example
 * // Ejemplo de uso de la función updateRawMaterial
 * app.put("/raw-materials/:id", authenticateToken, updateRawMaterial);
 */
export async function updateRawMaterial(req, res) {
  try {
    const userId = req.user.id;
    const rawMaterial = await RawMaterial.findOneAndUpdate(
      { id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!rawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Elimina una materia prima de la base de datos.
 *
 * Esta función elimina una materia prima específica de la base de datos, asegurándose de que pertenezca al usuario autenticado.
 * Después de eliminar la materia prima, también la elimina de la lista de materias primas del usuario.
 *
 * @param {object} req - El objeto de solicitud, que contiene el ID de la materia prima a eliminar en `req.params.id`.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP indicando el estado de la eliminación de la materia prima.
 *
 * @example
 * // Ejemplo de uso de la función deleteRawMaterial
 * app.delete("/raw-materials/:id", authenticateToken, deleteRawMaterial);
 */
export async function deleteRawMaterial(req, res) {
  try {
    const userId = req.user.id;
    const rawMaterial = await RawMaterial.findOneAndDelete({
      id: req.params.id,
      user: userId,
    });

    if (!rawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    // Remove the raw material from the user's list
    await User.findByIdAndUpdate(userId, {
      $pull: { RawMaterials: req.params.id },
    });

    res.json({ message: "Materia prima eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
