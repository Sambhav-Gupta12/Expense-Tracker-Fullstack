import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Expense } from "../models/expense.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const createExpense = asyncHandler(async (req, res) => {

    // Get expense data from frontend
    // check for validation and empty fields
    // make user the owner
    // Save the data in DB
    // give response

    const { title, amount, category, paymentMethod, account, date, note, categoryIcon } = req.body

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
            categoryIcon,
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

const getAllExpenses = asyncHandler(async (req, res) => {

    const expenses = await Expense.find({
        owner: req.user._id
    })

    res
        .status(200)
        .json(
            new ApiResponse(200, expenses, "Expenses fetched successfully")
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

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
        throw new ApiError(400, "Invalid expense ID");
    }

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

const deleteExpense = asyncHandler(async (req, res) => {

    const { expenseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
        throw new ApiError(400, "Invalid expense ID");
    }

    const expense = await Expense.findOneAndDelete({
        _id: expenseId,
        owner: req.user._id
    })

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Expense deleted successfully")
        )

})

// Calculating total expense, total category wise expenses in backend using aggregation pipeline. Not going to use in this project, just for practicing.

const getTotalExpense = asyncHandler(async (req, res) => {

    const totalExpense = await Expense.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $group: {
                _id: null,
                totalExpense: {
                    $sum: "$amount"
                }
            }
        }
    ])

    const total =
        totalExpense[0]?.totalExpense || 0;

    res
        .status(200)
        .json(
            new ApiResponse(200, total, "Total expense fetched")
        )
})

const getCategoryExpenseSummary = asyncHandler(async (req, res) => {

    const totalCatExpense = await Expense.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $group: {
                _id: "$category",
                totalCatExpense: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    res
    .status(200)
    .json(
        new ApiResponse(200, totalCatExpense, "Category wise total expenses fetched")
    )
})

export {
    createExpense,
    updateExpense,
    getAllExpenses,
    deleteExpense,
    getTotalExpense,
    getCategoryExpenseSummary
}