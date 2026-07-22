import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Expense } from "../models/expense.model.js"
import jwt from "jsonwebtoken"

const createExpense = asyncHandler(async (req, res) => {

    // Get expense data from frontend
    // check for validation and empty fields
    // make user the owner
    // Save the data in DB
    // give response

    const { title, amount, category, paymentMethod, account, date, note } = req.body

    if (
        !title?.trim() ||
        !amount ||
        !category?.trim() ||
        !paymentMethod?.trim() ||
        !date
    ) {
        throw new ApiError(400, "All required fields are mandatory");
    }

    if (amount <= 0) {
        throw new ApiError(400, "Amount must be greater than 0");
    }

    const expense = await Expense.create(
        {
            title,
            amount,
            category,
            paymentMethod,
            account,
            date,
            note: note || "",
            owner: req.user._id
        }
    )

    if (!expense) {
        throw new ApiError(500, "Something went wrong");
    }

    res
        .status(201)
        .json(
            new ApiResponse(201, expense, "Expense added !!")
        )

})

const updateExpense = asyncHandler(async (req, res) => {

    // Get data to be updated from frontend
    // validation for empty
    // get expense id from params
    // find by id and update
    // send response

    const { title, amount, category, paymentMethod, account, date, note } = req.body

    if (
        !title?.trim() ||
        !amount ||
        !category?.trim() ||
        !paymentMethod?.trim() ||
        !date
    ) {
        throw new ApiError(400, "All required fields are mandatory");
    }

    if (amount <= 0) {
        throw new ApiError(400, "Amount must be greater than 0");
    }

    const { expenseId } = req.params;

    const expense = await Expense.findOneAndUpdate(

        {
            _id: expenseId,
            owner: req.user._id
        },

        {
            $set: {
                title: title.trim(),
                amount,
                category,
                paymentMethod,
                account,
                date,
                note: note?.trim()
            }
        },
        { new: true }
    )

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, expense, "Expense updated successfully")
        )

})

export {
    createExpense,
    updateExpense
}