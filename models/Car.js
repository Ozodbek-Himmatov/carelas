import { Schema, model } from "mongoose";

const CarSchema = new Schema(
    {
        image: { type: String, required: true },
        model: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Car = model("Car", CarSchema);
export default Car;
