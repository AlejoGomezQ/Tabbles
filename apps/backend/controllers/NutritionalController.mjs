import NutritionalTable from "../models/NutritionalTable.mjs";

export async function getAllTables(req, res) {
  try {
    const tables = await find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTable(req, res) {
  const newTable = new NutritionalTable(req.body);
  try {
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
