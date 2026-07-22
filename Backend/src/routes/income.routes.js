import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createIncome, deleteIncome, getAllIncomes, updateIncome } from "../controllers/income.controller.js";

const router = Router();

router.route("/add-income").post(verifyJWT, createIncome)

router.route("/get-incomes").get(verifyJWT, getAllIncomes)

router.route("/update-income/:incomeId").patch(verifyJWT, updateIncome)

router.route("/delete-income/:incomeId").delete(verifyJWT, deleteIncome)

export default router