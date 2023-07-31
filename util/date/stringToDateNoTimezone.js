const stringToDateNoTimezone = (dateString) => {
  const [, year, month, day] = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default stringToDateNoTimezone;
