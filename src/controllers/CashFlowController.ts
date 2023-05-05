import { Request, Response } from 'express'
import { getFormatDate } from '../utils/getFormatDate'
import { convertDateInput } from '../utils/convertDateInput'
import { ICashInteraction } from '../interface/ICashInteraction'
import { conn } from '../index'
import { getFirstAndLastDayOfWeek } from '../utils/getFirstAndLastDayOfWeek'
import { getBalance } from '../utils/getBalance'

interface IResponse extends Response {
  json(data: { sum: number, message: string } | ICashInteraction | void): this;
}

interface IResults {
  affectedRows: number
}

class CashFlowController {
  createCashflow(req: Request, res: Response): IResponse {
    const { user, title, day, month, year, amount, type }: ICashInteraction = req.body
    const { id: userId } = req.headers

    const currentDate = new Date(2023, month, 0)
    const lastDayOfTheMonth = currentDate.getDate()
    if(day <= 0 || day > lastDayOfTheMonth) {
      return res.status(400).json({ message: "Please enter a valid day!" })
    }

    const sqlQuery = 'INSERT INTO cashflow (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    const sanitizedData =  [
      'title', 'user', 'day', 'month', 'year', 'amount', 'type', 'userId',
       title, user, day, month, year, amount, type.toLowerCase(), userId
    ]

    conn.query(sqlQuery, sanitizedData, function (err: string) {
      if(err)
        return res.status(400).json(err)
    })
    
    return res.status(201).json({ message: "Cashflow created successfully!" })
  }

  getFlowByCurrentMonth(req: Request, res: Response): void {
    const { id: userId } = req.headers

    const formattedDate:string = getFormatDate()
    const dayNumber:number = Number(formattedDate.split("/")[0])
    const monthNumber:number = Number(formattedDate.split("/")[1])
    const yearNumber:number = Number(formattedDate.split("/")[2])

    const sqlQuery = 'SELECT * FROM cashflow WHERE ?? = ? and ?? = ? and ?? = ?'
    const sanitizedData = ['month', monthNumber, 'userId', userId, 'year', yearNumber]

    conn.query(sqlQuery, sanitizedData, function (err: string, data: ICashInteraction[]) {
      if(err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
      }

      const cashflowByCurrentMonth = data

      const cashflowByCurrentDay = 
        data.filter((element: ICashInteraction) => 
        element.day === dayNumber && 
        element.month === monthNumber
      )
      
      const currentDate = new Date(2023, monthNumber, 0)
      const lastDayOfTheSelectedMonth = currentDate.getDate()
      const daysOfTheWeek = getFirstAndLastDayOfWeek(dayNumber, lastDayOfTheSelectedMonth)

      const cashflowByCurrentWeek = 
        data.filter((element: ICashInteraction) => 
        element.day >= daysOfTheWeek.firstDayOfTheWeek && 
        element.day <= daysOfTheWeek.lastDayOfTheWeek
      )

      const dayBalance = getBalance(cashflowByCurrentDay)
      const weekBalance = getBalance(cashflowByCurrentWeek)
      const monthBalance = getBalance(cashflowByCurrentMonth)

      return res.status(200).json({
        cashflowByCurrentDay, dayBalance,
        cashflowByCurrentWeek, weekBalance,
        cashflowByCurrentMonth, monthBalance
      })
    })
  }

  getFlowBySelectedMonth(req: Request, res: Response): void {
    const { month, year } = req.body
    const { id: userId } = req.headers

    const selectedMonthNumber = convertDateInput(month)
    
    const sqlQuery = 'SELECT * FROM cashflow WHERE ?? = ? and ?? = ? and ?? = ?'
    const sanitizedData = ['month', selectedMonthNumber, 'year', year, 'userId', userId]

    conn.query(sqlQuery, sanitizedData, function (err: string, data: ICashInteraction[]) {
      if(err) {
        return res.json({ message: err })
      }

      const cashflowBySelectedMonth = data
      const monthBalance = getBalance(data)

      return res.json({cashflowBySelectedMonth, monthBalance})
    })
  }

  getUserAccountInformations(req: Request, res: Response): void {
    const { id: userId } = req.headers

    const sqlQuery = 'SELECT * FROM cashflow WHERE ?? = ?'
    const sanitizedData = ['userId', userId]

    conn.query(sqlQuery, sanitizedData, function (err: string, data: any) {
      if(err) {
        console.log(err)
        return res.json({ message: "Something went wrong" })
      }

      const cashflowByUser = data
      const monthBalance = getBalance(data)

      return res.json({
        cashflowByUser, 
        monthBalance
      })
    })
  }

  updateCashflowById(req: Request, res: Response): void {
    const { id } = req.params
    const { id: userId } = req.headers
    const { title, amount, day, month, year, type } = req.body
    
    const sqlQuery = 
      'UPDATE cashflow SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?'
    const sanitizedData = [
      'title', title, 'amount', amount, 'day', day, 'month', month, 
      'year', year, 'type', type.toLowerCase(), 'id', id, 'userId', userId
    ]
    
    conn.query(sqlQuery, sanitizedData, function (err: string, results: IResults) {
      if(err)
        return res.status(400).json(err)

      if(results.affectedRows === 0) 
        return res.status(200).json({ message: "Error while trying to update the cashflow"})
        
      return res.status(200).json({message: "Cashflow updated Successfully!"})
    })
  }

  deleteCashflowById(req: Request, res: Response): void {
    const { id } = req.params
    const { id: userId } = req.headers

    const sqlQuery = 'DELETE FROM cashflow WHERE ?? = ? AND ?? = ?'
    const sanitizedData = ['id', id, 'userId', userId]

    conn.query(sqlQuery, sanitizedData, function (err: string, results: IResults) {
      if(err)
        return res.status(400).json(err)

      if(results.affectedRows === 0) 
        return res.status(200).json({ message: "Error while trying to delete the cashflow"})
        
      return res.status(200).json({message: "Cashflow deleted Successfully!"})
    })
  }
}
export { CashFlowController }