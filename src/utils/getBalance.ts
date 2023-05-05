import { ICashInteraction } from "../interface/ICashInteraction";

function getBalance(data: ICashInteraction[]): number {
  let sum: number = 0
  data.forEach((element: any) => {
    if(element.type === 'deposit') {
      sum += element.amount
    } else {
      sum -= element.amount
    }
  });

  return sum
}

export { getBalance }