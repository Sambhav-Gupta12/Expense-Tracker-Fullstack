import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'
import expenseRouter from './routes/expense.routes.js'
import incomeRouter from './routes/income.routes.js'
import budgetRouter from './routes/budget.routes.js'
import catBudgetRouter from './routes/catBudget.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/expenses", expenseRouter)
app.use("/api/v1/incomes", incomeRouter)
app.use("/api/v1/budgets", budgetRouter)
app.use("/api/v1/category-budgets", catBudgetRouter)

// LAST middleware
app.use(errorHandler);

export { app }