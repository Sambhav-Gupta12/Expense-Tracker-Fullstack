import { Router } from "express";
import { createExpense, updateExpense } from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-expense").post(verifyJWT, createExpense)

router.route("/update-expense/:expenseId").patch(verifyJWT, updateExpense)

export default router