import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Budget } from "../models/budget.model.js"
import mongoose from "mongoose"

const createBudget = asyncHandler(async (req, res) => {

    // get budget's amount, month, year from frontend
    // check validation - not empty, negative
    // check if budget already exists
    // make user the owner
    // Save the data in DB
    // give response

    const { monthlyBudget, month, year } = req.body

    if (monthlyBudget == null || !month || !year) {
        throw new ApiError(400, "Amount, month and year are required")
    }

    if (monthlyBudget <= 0) {
        throw new ApiError(400, "Budget amount must be greater than 0")
    }

    const existingBudget = await Budget.findOne({
        owner: req.user._id,
        month,
        year
    });

    if (existingBudget) {
        throw new ApiError(409, "Budget already exists for this month");
    }

    const budget = await Budget.create({
        monthlyBudget,
        month,
        year,
        owner: req.user._id
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, budget, "New budget created")
        )

})

const getAllBudgets = asyncHandler(async (req, res) => {

    const budgets = await Budget.find({
        owner: req.user._id
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, budgets, "All budgets fetched")
        )
})

const updateBudget = asyncHandler(async (req, res) => {

    // get new data from frontend
    // validation
    // get budget id from req.params
    // find the budget from id and update
    // give res

    const { monthlyBudget, month, year } = req.body

    if (monthlyBudget == null || !month || !year) {
        throw new ApiError(400, "Amount, month and year are required")
    }

    if (monthlyBudget <= 0) {
        throw new ApiError(400, "Budget amount must be greater than 0")
    }

    const { budgetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
        throw new ApiError(400, "Invalid budget ID");
    }

    const existingBudget = await Budget.findOne({
        owner: req.user._id,
        month,
        year,
        _id: { $ne: budgetId }
    });

    if (existingBudget) {
        throw new ApiError(
            409,
            "Budget already exists for this month"
        );
    }

    const budget = await Budget.findOneAndUpdate(
        {
            _id: budgetId,
            owner: req.user._id
        },
        {
            $set: {
                monthlyBudget,
                month,
                year
            }
        },
        {
            new: true
        }
    )

    if (!budget) {
        throw new ApiError(404, "Budget not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, budget, "Budget updated successfully")
        )


})

const deleteBudget = asyncHandler(async (req, res) => {

    // get budget id from req.params
    // find budget by id and delete
    // give response

    const { budgetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
        throw new ApiError(400, "Invalid budget ID");
    }

    const budget = await Budget.findOneAndDelete(
        {
            _id: budgetId,
            owner: req.user._id
        }
    )

    if (!budget) {
        throw new ApiError(404, "Budget not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Budget deleted successfully")
        )

})

export {
    createBudget,
    getAllBudgets,
    updateBudget,
    deleteBudget
}