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
}