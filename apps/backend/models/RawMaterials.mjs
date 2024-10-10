import mongoose from "mongoose";

const RawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    calories: Number,
    proteins: Number,
    totalFats: Number,
    carbs: Number,
    saturatedFats: Number,
    transFats: Number,
    cholesterol: Number,
    sodium: Number,
    fiber: Number,
    sugar: Number,
    addedSugar: Number,
    vitaminA: Number,
    vitaminC: Number,
    vitaminD: Number,
    iron: Number,
    calcium: Number,
    zinc: Number,
    water: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

RawMaterialSchema.index({ name: 1, user: 1 }, { unique: true });

export default mongoose.model("RawMaterial", RawMaterialSchema);
