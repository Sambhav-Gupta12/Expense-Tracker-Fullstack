import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBudget, deleteBudget, getAllBudgets, updateBudget } from "../controllers/budget.controller.js";

const router = Router();

router.route("/add-budget").post(verifyJWT, createBudget)

router.route("/get-budgets").get(verifyJWT, getAllBudgets)

router.route("/update-budget/:budgetId").patch(verifyJWT, updateBudget)

router.route("/delete-budget/:budgetId").delete(verifyJWT, deleteBudget)

export default router