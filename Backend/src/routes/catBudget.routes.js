import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCatBudget, deleteCatBudget, getAllCatBudgets, updateCatBudget } from "../controllers/catBudget.controller.js";

const router = Router();

router.route("/add-category-budget").post(verifyJWT, createCatBudget)

router.route("/get-category-budgets").get(verifyJWT, getAllCatBudgets)

router.route("/update-category-budget/:catBudgetId").patch(verifyJWT, updateCatBudget)

router.route("/delete-category-budget/:catBudgetId").delete(verifyJWT, deleteCatBudget)

export default router