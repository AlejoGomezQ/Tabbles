import { Schema, model } from "mongoose";

const NutritionalTableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: String,
        quantity: Number,
        unit: String,
      },
    ],
    calories: Number,
    proteins: Number,
    fats: Number,
    carbs: Number,
  },
  { timestamps: true }
);

export default model("NutritionalTable", NutritionalTableSchema);
