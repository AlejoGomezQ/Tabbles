import Food from "../models/Foods.mjs";
import User from "../models/Users.mjs";

/**
 * Crea un nuevo alimento y lo asocia a un usuario.
 *
 * Esta función crea un nuevo objeto de alimento en la base de datos. Luego, se asocia a un usuario
 * mediante el campo `user` y se agrega la referencia del nuevo alimento a la lista de alimentos del usuario.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos enviados por el cliente.
 * @param {object} req.body - El cuerpo de la solicitud con la información del nuevo alimento.
 * @param {string} req.body.name - El nombre del alimento.
 * @param {string} req.body.description - La descripción del alimento.
 * @param {array} req.body.ingredients - La lista de ingredientes del alimento.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con el estado de la creación del alimento.
 *
 * @example
 * // Ejemplo de uso de la función createFood
 * app.post("/foods", authenticateToken, createFood);
 */
export async function createFood(req, res) {
  try {
    const userId = req.user.id;
    const newFood = new Food({
      ...req.body,
      user: userId,
    });

    await newFood.save();

    await User.findByIdAndUpdate(userId, {
      $push: { foods: newFood._id },
    });

    res.status(201).json({
      message: "Alimento creado exitosamente creado exitosamente.",
      food: newFood,
    });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "Ya tienes un alimento con ese nombre." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Obtiene todos los alimentos asociados al usuario autenticado.
 *
 * Esta función obtiene todos los alimentos que están asociados al usuario que realiza la solicitud,
 * utilizando el ID del usuario presente en `req.user.id`. También se realiza una consulta para
 * obtener los ingredientes de cada alimento, incluyendo la referencia a las materias primas asociadas.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos del usuario autenticado.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con la lista de alimentos.
 *
 * @example
 * // Ejemplo de uso de la función getAllFoods
 * app.get("/foods", authenticateToken, getAllFoods);
 */
export async function getAllFoods(req, res) {
  try {
    const userId = req.user.id;
    const Foods = await Food.find({ user: userId }).populate(
      "ingredients.rawMaterial"
    );

    res.json(Foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Actualiza los datos de un alimento específico.
 *
 * Esta función actualiza un alimento existente en la base de datos, buscando primero por el ID
 * del alimento y asegurándose de que pertenezca al usuario autenticado.
 *
 * @param {object} req - El objeto de solicitud, que contiene los datos actualizados del alimento en `req.body`.
 * @param {string} req.params.id - El ID del alimento a actualizar.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP con el alimento actualizado.
 *
 * @example
 * // Ejemplo de uso de la función updateFood
 * app.put("/foods/:id", authenticateToken, updateFood);
 */
export async function updateFood(req, res) {
  try {
    const userId = req.user.id;
    const food = await Food.findOneAndUpdate(
      { id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!food) {
      return res.status(404).json({ message: "Alimento no encontrado." });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Elimina un alimento de la base de datos.
 *
 * Esta función elimina un alimento específico de la base de datos, asegurándose de que pertenezca al usuario autenticado.
 * Después de eliminar el alimento, también lo elimina de la lista de alimentos del usuario.
 *
 * @param {object} req - El objeto de solicitud, que contiene el ID del alimento a eliminar en `req.params.id`.
 * @param {object} res - El objeto de respuesta, utilizado para enviar la respuesta al cliente.
 *
 * @returns {void} - Retorna una respuesta HTTP indicando el estado de la eliminación del alimento.
 *
 * @example
 * // Ejemplo de uso de la función deleteFood
 * app.delete("/foods/:id", authenticateToken, deleteFood);
 */
export async function deleteFood(req, res) {
  try {
    const userId = req.user.id;
    const food = await Food.findOneAndDelete({
      id: req.params.id,
      user: userId,
    });

    if (!food) {
      return res.status(404).json({ message: "Alimento no encontrado." });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { Foods: req.params.id },
    });

    res.json({ message: "Alimento Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
