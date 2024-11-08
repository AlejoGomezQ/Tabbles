import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * Esquema de Mongoose para el modelo de "User" (Usuario).
 *
 * Este esquema define la estructura de los documentos de usuario almacenados en la base de datos MongoDB.
 * Cada usuario tiene nombre, apellido, email, una contraseña cifrada y referencias a materias primas y alimentos.
 *
 * @module models/User
 *
 * @example
 * // Ejemplo de uso del modelo User
 * import User from './models/User.mjs';
 * const nuevoUsuario = new User({
 *   name: 'Juan',
 *   lastName: 'Pérez',
 *   email: 'juan.perez@example.com',
 *   password: 'secretaContraseña'
 * });
 * nuevoUsuario.save().then(() => console.log('Usuario creado exitosamente'));
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rawMaterials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RawMaterial",
      },
    ],
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  { timestamps: true }
);

// Método para cifrar la contraseña antes de guardarla
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

//Método para validar la contraseña
UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
