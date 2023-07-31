/**
 * Gets an array of date objects between two dates, based on an interval.
 *
 * @author Adrian Moisa
 * @see https://stackoverflow.com/a/32374035/2292329
 *
 * @param {Moment} startDate
 * @param {Moment} endDate
 * @param {String} interval
 * @param {Number} total
 * @returns {[]}
 */
export const getDatesRangeArray = ({startDate, endDate, interval = 'days', total = 1}) => {
  const dateArray = []
  let currentDate = startDate.clone()

  while (currentDate < endDate) {
    dateArray.push(currentDate)
    currentDate = currentDate.clone().add(total, interval)
  }

  return dateArray
}

export default getDatesRangeArray
