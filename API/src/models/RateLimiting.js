import mongoose from "mongoose";

const RateSchema = new mongoose.Schema({
UniqueID: {type: String, required: true, index: true},
Action: {type: String, required: true, enum: ["otp", "login"], index: true},
Count: {type: Number, default: 1},
Timer: {type: Date, default: Date.now}
}, {timestamps: true});

export const RateLimiting = mongoose.model("Rate_Limiting", RateSchema);