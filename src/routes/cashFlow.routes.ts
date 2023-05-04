import { Router } from 'express'
import { CashFlowController } from '../controllers/CashFlowController'

const cashFlowRoutes = Router()

const cashFlowController = new CashFlowController()

cashFlowRoutes.get("/account", cashFlowController.getUserAccountInformations)
cashFlowRoutes.post("/bymonth", cashFlowController.getFlowBySelectedMonth)
cashFlowRoutes.post("/create", cashFlowController.create)
cashFlowRoutes.get("/", cashFlowController.getFlowByCurrentMonth)

export { cashFlowRoutes }