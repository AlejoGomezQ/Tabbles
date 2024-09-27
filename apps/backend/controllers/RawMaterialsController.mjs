import RawMaterial from "../models/RawMaterials.mjs";

export async function createRawMaterial(req, res) {
  try {
    const newRawMaterial = new RawMaterial(req.body);

    await newRawMaterial.save();

    res.status(201).json({
      message: "Materia prima creada exitosamente.",
      rawMaterial: newRawMaterial,
    });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "La materia prima con ese nombre ya existe." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

export async function getAllRawMaterials(req, res) {
  try {
    const rawMaterials = await RawMaterial.find();

    res.json(rawMaterials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getRawMaterialById(req, res) {
  try {
    const rawMaterial = await RawMaterial.findById(req.params.id);

    if (!rawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateRawMaterial(req, res) {
  try {
    const rawMaterial = await RawMaterial.findByIdAndUpdate(
      req.params.id,
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

export async function deleteRawMaterial(req, res) {
  try {
    const rawMaterial = await RawMaterial.findByIdAndDelete(req.params.id);

    if (!rawMaterial) {
      return res.status(404).json({ message: "Materia prima no encontrada." });
    }

    res.json({ message: "Materia prima eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
