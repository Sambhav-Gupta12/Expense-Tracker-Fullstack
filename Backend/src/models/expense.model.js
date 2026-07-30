import mongoose, { Schema } from "mongoose";
import { CATEGORIES } from "../constants.js"
import { PAYMENTMETHODS } from "../constants.js";
import { ACCOUNT } from "../constants.js";

const expenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            trim: true
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
            required: true,
            index: true
        },
        note: {
            type: String,
            trim: true
        },
        categoryIcon: {
            type: String,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, { timestamps: true })

    expenseSchema.index({ owner: 1 });

export const Expense = mongoose.model("Expense", expenseSchema)