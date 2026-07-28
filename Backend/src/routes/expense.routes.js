import { Router } from "express";
import { createExpense, getAllExpenses, updateExpense, deleteExpense, getTotalExpense, getCategoryExpenseSummary } from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-expense").post(verifyJWT, createExpense)

router.route("/get-expenses").get(verifyJWT, getAllExpenses)

router.route("/update-expense/:expenseId").patch(verifyJWT, updateExpense)

router.route("/delete-expense/:expenseId").delete(verifyJWT, deleteExpense)


router.route("/get-total-expense").get(verifyJWT, getTotalExpense)

router.route("/get-total-category-expense").get(verifyJWT, getCategoryExpenseSummary)

export default router