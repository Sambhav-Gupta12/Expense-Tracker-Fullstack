import mongoose, { Schema } from "mongoose";
import { PAYMENTMETHODS } from "../constants.js";
import { ACCOUNT } from "../constants.js";

const incomeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: PAYMENTMETHODS,
            required: true
        },
        account: {
            type: String,
            enum: ACCOUNT,
        },
        date: {
            type: Date,
            required: true
        },
        note: {
            type: String,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, {timestamps: true})

    incomeSchema.index({ owner: 1 });

export const Income = mongoose.model("Income", incomeSchema)