function getFormatDate(): string {
  const currentDate: Date = new Date()
  const year: number = currentDate.getFullYear()
  const month: number = currentDate.getMonth() + 1
  const day: number = currentDate.getDate()
  
  const formatDate: string = String(`${day}/${month}/${year}`)

  return formatDate
}

export { getFormatDate }