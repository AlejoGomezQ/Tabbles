import RawMaterial from "../models/RawMaterials.mjs";

export async function getAllRawMaterials(req, res) {
  try {
    const rawMaterials = await RawMaterial.find();

    res.json(rawMaterials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createRawMaterial(req, res) {
  try {
    const newRawMaterial = new RawMaterial(req.body);

    await newRawMaterial.save();

    res.status(201).json({
      message: "Raw material created successfully",
      rawMaterial: newRawMaterial,
    });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "A raw material with this name already exists." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}
