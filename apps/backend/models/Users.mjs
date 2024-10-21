import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    foods:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
      }
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
