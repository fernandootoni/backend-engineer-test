interface MonthNames {
  [monthName: string]: string
}

function convertMonthNameToEnglish(monthName: string): string {
  const months: MonthNames = {
    'janeiro': 'January',
    'fevereiro': 'February',
    'março': 'March',
    'abril': 'April',
    'maio': 'May',
    'junho': 'June',
    'julho': 'July',
    'agosto': 'August',
    'setembro': 'September',
    'outubro': 'October',
    'novembro': 'November',
    'dezembro': 'December',
  };
  
  return months[monthName.toLowerCase()];
}

export { convertMonthNameToEnglish }