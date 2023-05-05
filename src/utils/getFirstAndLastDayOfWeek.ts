interface FirstAndLastDayOfWeek {
  firstDayOfTheWeek: number;
  lastDayOfTheWeek: number;
}

function getFirstAndLastDayOfWeek(dayNumber: number, lastDayOfTheSelectedMonth: number): FirstAndLastDayOfWeek {
  let firstDayOfTheWeek:number = 0;
  let lastDayOfTheWeek:number = 0;
  if(dayNumber < 8) {
    firstDayOfTheWeek = 1
    lastDayOfTheWeek = 7
  } else if(dayNumber > 7 && dayNumber < 15) {
    firstDayOfTheWeek = 8
    lastDayOfTheWeek = 14
  } else if(dayNumber > 14 && dayNumber < 22) { 
    firstDayOfTheWeek = 15
    lastDayOfTheWeek = 21
  } else if(dayNumber > 21 && dayNumber < 29) {
    firstDayOfTheWeek = 22
    lastDayOfTheWeek = 28
  } else {
    firstDayOfTheWeek = 29
    lastDayOfTheWeek = lastDayOfTheSelectedMonth
  }

  return { firstDayOfTheWeek, lastDayOfTheWeek }
}

export { getFirstAndLastDayOfWeek }