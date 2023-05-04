type AllowedValues = "deposit" | "transfer"

interface ICashInteraction {
  user: string,
  userId: string,
  title: string,
  day: number,
  month: number,
  year: number,
  amount: number,
  type: AllowedValues
}

export { ICashInteraction }