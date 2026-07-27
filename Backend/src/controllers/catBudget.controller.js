import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { CatBudget } from "../models/catBudget.model.js"
import mongoose from "mongoose"

const createCatBudget = asyncHandler(async (req, res) => {

    // get data from frontend
    // validation
    // get current month and year
    // make user the owner
    // save data in DB
    // return response

    const { amount, category } = req.body

    if (amount == null || !category?.trim()) {
        throw new ApiError(400, "Amount and category are required")
    }

    if (amount <= 0) {
        throw new ApiError(400, "Budget amount must be greater than 0")
    }

    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const existingCatBudget = await CatBudget.findOne({
        owner: req.user._id,
        category,
        month,
        year
    });

    if (existingCatBudget) {
        throw new ApiError(409, "This Category's budget already exists for this month");
    }

    const catBudget = await CatBudget.create(
        {
            amount,
            category: category.trim(),
            month,
            year,
            owner: req.user._id
        }
    )

    return res
        .status(201)
        .json(
            new ApiResponse(201, catBudget, "Category budget created successfully")
        )

})

const getAllCatBudgets = asyncHandler(async (req, res) => {

    const catBudgets = await CatBudget.find(
        {
            owner: req.user._id,
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, catBudgets, "All category budgets fetched")
        )
})

const updateCatBudget = asyncHandler(async (req, res) => {

    const { amount, category } = req.body

    if (amount == null || !category?.trim()) {
        throw new ApiError(400, "Amount and category are required")
    }

    if (amount <= 0) {
        throw new ApiError(400, "Budget amount must be greater than 0")
    }

    const { catBudgetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(catBudgetId)) {
        throw new ApiError(400, "Invalid category budget ID");
    }

    const currentBudget = await CatBudget.findOne({
        _id: catBudgetId,
        owner: req.user._id
    });

    if (!currentBudget) {
        throw new ApiError(404, "Category Budget not found");
    }

    const existingCatBudget = await CatBudget.findOne({
        owner: req.user._id,
        category: category.trim(),
        month: currentBudget.month,
        year: currentBudget.year,
        _id: { $ne: catBudgetId }
    });

    if (existingCatBudget) {
        throw new ApiError(
            409,
            "Category budget already exists for this month"
        );
    }

    const catBudget = await CatBudget.findOneAndUpdate(
        {
            _id: catBudgetId,
            owner: req.user._id
        },
        {
            $set: {
                amount,
                category: category.trim()
            }
        },
        {
            new: true
        }
    )

    if (!catBudget) {
        throw new ApiError(404, "Category Budget not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, catBudget, "Category budget updated successfully")
        )
})

const deleteCatBudget = asyncHandler(async (req, res) => {

    const { catBudgetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(catBudgetId)) {
        throw new ApiError(400, "Invalid category budget ID");
    }

    const catBudget = await CatBudget.findOneAndDelete(
        {
            _id: catBudgetId,
            owner: req.user._id
        }
    )

    if (!catBudget) {
        throw new ApiError(404, "Category budget not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Category budget deleted successfully")
        )
})

export {
    createCatBudget,
    getAllCatBudgets,
    updateCatBudget,
    deleteCatBudget
}