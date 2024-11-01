import Food from "../models/Foods.mjs";
import User from "../models/Users.mjs";

export async function createFood(req, res) {
  try {
    const userId = req.user.id; // Assuming you have middleware that sets req.user
    const newFood = new Food({
      ...req.body,
      user: userId,
    });

    await newFood.save();

    // Add the raw material to the user's list
    await User.findByIdAndUpdate(userId, {
      $push: { foods: newFood._id },
    });

    res.status(201).json({
      message: "Alimento creado exitosamente creado exitosamente.",
      food : newFood
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
};

export async function getAllFoods(req, res) {
  try {
    const userId = req.user.id;
    const Foods = await Food.find({ user: userId });

    res.json(Foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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

    // Remove the raw material from the user's list
    await User.findByIdAndUpdate(userId, {
      $pull: { Foods: req.params.id },
    });

    res.json({ message: "Alimento Eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
