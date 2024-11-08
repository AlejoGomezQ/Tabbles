import mongoose from "mongoose";

/**
 * Esquema de Mongoose para el modelo de "RawMaterial" (Materia Prima).
 *
 * Este esquema define la estructura y las restricciones de los documentos de materias primas almacenados en la base de datos MongoDB.
 * Cada materia prima tiene un nombre único, una serie de propiedades nutricionales, y está asociada a un usuario.
 *
 * @module models/RawMaterial
 *
 * @example
 * // Ejemplo de uso del modelo RawMaterial
 * import RawMaterial from './models/RawMaterial.mjs';
 * const nuevaMateriaPrima = new RawMaterial({
 *   name: 'Tomato',
 *   calories: 18,
 *   proteins: 0.9,
 *   totalFats: 0.2,
 *   carbohydrates: 3.9,
 *   user: 'userId'
 * });
 * nuevaMateriaPrima.save().then(() => console.log('Materia prima creada exitosamente'));
 */
const RawMaterialSchema = new mongoose.Schema(
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
    calories: Number,
    proteins: Number,
    totalFats: Number,
    carbohydrates: Number,
    saturatedFats: Number,
    transFats: Number,
    cholesterol: Number,
    sodium: Number,
    dietaryFiber: Number,
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
RawMaterialSchema.index({ id: 1 }, { unique: true });

export default mongoose.model("RawMaterial", RawMaterialSchema);
