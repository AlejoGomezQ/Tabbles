import mongoose from "mongoose";


const FoodSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      portion: Number,
      ingredients: [
        {
            rawMaterial: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RawMaterial",
                required: true
            },
            amount:{
                type: Number,
                required:true
            }
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