import mongoose, { Schema } from "mongoose";

const catBudgetSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        categoryIcon: {
            type: String,
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

    catBudgetSchema.index(
    {
        owner: 1,
        category: 1,
        month: 1,
        year: 1
    },
    {
        unique: true
    }
);

export const CatBudget = mongoose.model("CatBudget", catBudgetSchema)