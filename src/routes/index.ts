import { Router } from 'express'
import { cashFlowRoutes } from './cashFlow.routes'

const router = Router()

router.use("/cashflow", cashFlowRoutes)

export { router }