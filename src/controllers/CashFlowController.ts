import { Request, Response } from 'express'
import { getFormatDate } from '../utils/getFormatDate'
import { convertDateInput } from '../utils/convertDateInput'
import { ICashInteraction } from '../interface/ICashInteraction'
import { conn } from '../index'

interface IResponse extends Response {
  json(data: any): any
}

class CashFlowController {
  async create(req: Request, res: Response): Promise<any> {
    const { user, title, day, month, year, amount, type }: ICashInteraction = req.body
    const { id: userId } = req.headers

    const sqlQuery = 
    `INSERT INTO cashflow (title, user, day, month, year, amount, type, userId) VALUES ('${title}', '${user}', '${day}', '${month}', '${year}', '${amount}', '${type}', '${userId}')`

    conn.query(sqlQuery, function (err: string) {
      if(err)
        console.log(err)
    })
    
    return res.status(201).json()
  }

  async getFlowByCurrentMonth(req: Request, res: Response): Promise<any> {
    const { id: userId } = req.headers

    const formattedDate = getFormatDate()
    const day = Number(formattedDate.split("/")[0])
    const month = Number(formattedDate.split("/")[1])

    const sqlQuery = 
    `SELECT * FROM cashflow WHERE month = ${month} and userId = ${userId}`

    conn.query(sqlQuery, function (err: string, data: ICashInteraction[]) {
      if(err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
      }

      const cashflowByCurrentMonth = data
      const cashflowByCurrentDay = data.filter((element: ICashInteraction) => element.day === day && element.month === month)

      return res.status(200).json({cashflowByCurrentMonth, cashflowByCurrentDay})
    })
  }

  getFlowBySelectedMonth(req: Request, res: Response): any {
    const { month, year } = req.body
    const { id } = req.headers

    const selectedMonthNumber = convertDateInput(month)
    
    const sqlQuery = 
    `SELECT * FROM cashflow WHERE month = ${selectedMonthNumber} and year = ${year} and userId = ${id}`

    conn.query(sqlQuery, function (err: string, data: ICashInteraction) {
      if(err) {
        console.log(err)
        return res.json({ message: "Something went wrong" })
      }

      const cashflowBySelectedMonth = data

      return res.json(cashflowBySelectedMonth)
    })
  }

  getUserAccountInformations(req: Request, res: Response): any {
    const { id: userId } = req.headers

    const sqlQuery = 
    `SELECT * FROM cashflow WHERE userId = ${userId}`

    conn.query(sqlQuery, function (err: string, data: any) {
      if(err) {
        console.log(err)
        return res.json({ message: "Something went wrong" })
      }

      const cashflowByUser = data

      let sum: number = 0
      data.forEach((element: any) => {
        if(element.type === 'deposit') {
          sum += element.amount
        } else {
          sum -= element.amount
        }
      });

      return res.json({cashflowByUser, sum})
    })
  }
}
export { CashFlowController }