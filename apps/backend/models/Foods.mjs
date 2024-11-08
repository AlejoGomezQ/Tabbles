import mongoose from "mongoose";

/**
 * Esquema de Mongoose para el modelo de "Food" (Alimento).
 *
 * Este esquema define la estructura y las restricciones de los documentos de alimentos almacenados en la base de datos MongoDB.
 * Cada alimento tiene un nombre único, una lista de ingredientes (que hacen referencia a materias primas), y está asociado a un usuario.
 *
 * @module models/Food
 *
 * @example
 * // Ejemplo de uso del modelo Food
 * import Food from './models/Food.mjs';
 * const nuevoAlimento = new Food({
 *   name: 'Pizza',
 *   ingredients: [{ rawMaterial: 'rawMaterialId', amount: 200 }],
 *   user: 'userId'
 * });
 * nuevoAlimento.save().then(() => console.log('Alimento creado exitosamente'));
 */
const FoodSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    ingredients: [
      {
        rawMaterial: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RawMaterial",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

FoodSchema.index({ name: 1, user: 1 }, { unique: true });

export default mongoose.model("Food", FoodSchema);
