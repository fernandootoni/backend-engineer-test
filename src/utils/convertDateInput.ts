import { convertMonthNameToEnglish } from "./convertMonthNameToEnglish"

function convertDateInput(month: string): number {
  const monthName = convertMonthNameToEnglish(month)

  const date = new Date(`1 ${monthName} 2023`)
  const monthNumber = date.getMonth() + 1

  return Number(monthNumber)
}

export { convertDateInput }
