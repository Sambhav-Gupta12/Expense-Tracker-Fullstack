import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Income } from "../models/income.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const createIncome = asyncHandler(async (req, res) => {

    // Get income data from frontend
    // check for validation and empty fields
    // make user the owner
    // Save the data in DB
    // give response

    const { title, amount, paymentMethod, account, date, note } = req.body

    if (
        !title?.trim() ||
        !amount ||
        !paymentMethod?.trim() ||
        !date
    ) {
        throw new ApiError(400, "All required fields are mandatory");
    }

    if (amount <= 0) {
        throw new ApiError(400, "Amount must be greater than 0");
    }

    const income = await Income.create(
        {
            title,
            amount,
            paymentMethod,
            account,
            date,
            note: note || "",
            owner: req.user._id
        }
    )

    if (!income) {
        throw new ApiError(500, "Something went wrong");
    }

    res
        .status(201)
        .json(
            new ApiResponse(201, income, "Income added !!")
        )

})

const getAllIncomes = asyncHandler(async (req, res) => {

    const incomes = await Income.find({
        owner: req.user._id
    })

    res
        .status(200)
        .json(
            new ApiResponse(200, incomes, "Incomes fetched successfully")
        )
})

const updateIncome = asyncHandler(async (req, res) => {

    // Get data to be updated from frontend
    // validation for empty
    // get income id from params
    // find by id and update
    // send response

    const { title, amount, paymentMethod, account, date, note } = req.body

    if (
        !title?.trim() ||
        !amount ||
        !paymentMethod?.trim() ||
        !date
    ) {
        throw new ApiError(400, "All required fields are mandatory");
    }

    if (amount <= 0) {
        throw new ApiError(400, "Amount must be greater than 0");
    }

    const { incomeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(incomeId)) {
        throw new ApiError(400, "Invalid income ID");
    }

    const income = await Income.findOneAndUpdate(

        {
            _id: incomeId,
            owner: req.user._id
        },

        {
            $set: {
                title: title.trim(),
                amount,
                paymentMethod,
                account,
                date,
                note: note?.trim()
            }
        },
        { new: true }
    )

    if (!income) {
        throw new ApiError(404, "Income not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, income, "Income updated successfully")
        )

})

const deleteIncome = asyncHandler(async (req, res) => {

    const { incomeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(incomeId)) {
        throw new ApiError(400, "Invalid income ID");
    }

    const income = await Income.findOneAndDelete({
        _id: incomeId,
        owner: req.user._id
    })

    if (!income) {
        throw new ApiError(404, "Income not found");
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Income deleted successfully")
        )

})

export {
    createIncome,
    updateIncome,
    getAllIncomes,
    deleteIncome
}