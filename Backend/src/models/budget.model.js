import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
    {
        monthlyBudget: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, {timestamps: true})

    budgetSchema.index(
    {
        owner: 1,
        month: 1,
        year: 1
    },
    {
        unique: true
    }
);

export const Budget = mongoose.model("Budget", budgetSchema)