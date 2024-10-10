import RawMaterial from "../models/RawMaterials.mjs";
import User from "../models/Users.mjs";

export async function createRawMaterial(req, res) {
  try {
    const userId = req.user.id; // Assuming you have middleware that sets req.user
    const newRawMaterial = new RawMaterial({
      ...req.body,
      user: userId,
    });

    await newRawMaterial.save();

    // Add the raw material to the user's list
    await User.findByIdAndUpdate(userId, {
      $push: { RawMaterials: newRawMaterial._id },
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

export async function getAllRawMaterials(req, res) {
  try {
    const userId = req.user.id;
    const RawMaterials = await RawMaterial.find({ user: userId });

    res.json(RawMaterials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getRawMaterialById(req, res) {
  try {
    const userId = req.user.id;
    const RawMaterial = await RawMaterial.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!RawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json(RawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateRawMaterial(req, res) {
  try {
    const userId = req.user.id;
    const RawMaterial = await RawMaterial.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!RawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json(RawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteRawMaterial(req, res) {
  try {
    const userId = req.user.id;
    const RawMaterial = await RawMaterial.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!RawMaterial) {
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
