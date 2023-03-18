export function dateReformat(original: string) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]

  const newDate = new Date(original);

  const getDay = dayNames[newDate.getDay()];
  const getDate = newDate.getDate();
  const getMonth = monthNames[newDate.getMonth()]
  const getYear = String(newDate).substr(11,4);

  return `${getDay} ${getDate} ${getMonth} ${getYear}`;
}

export function hideSecond(original: string) {
  return original.substr(0,5);
}