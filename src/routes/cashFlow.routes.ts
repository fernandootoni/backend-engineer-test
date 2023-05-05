import { Router } from 'express'
import { CashFlowController } from '../controllers/CashFlowController'

const cashFlowRoutes = Router()

const cashFlowController = new CashFlowController()

cashFlowRoutes.post("/create", cashFlowController.createCashflow)
cashFlowRoutes.post("/bymonth", cashFlowController.getFlowBySelectedMonth)
cashFlowRoutes.get("/account", cashFlowController.getUserAccountInformations)
cashFlowRoutes.delete("/:id", cashFlowController.deleteCashflowById)
cashFlowRoutes.post("/:id", cashFlowController.updateCashflowById)
cashFlowRoutes.get("/", cashFlowController.getFlowByCurrentMonth)

export { cashFlowRoutes }