import moment from 'moment'

export default recoveryPlan => recoveryPlan.PlanActivities.reduce(
  (dateRange, planActivity) => {
    const startDate = moment(planActivity.startDate)
    const stopDate = moment(planActivity.stopDate)
    return [
      !dateRange[0] || startDate.isBefore(dateRange[0], 'day') ? startDate : dateRange[0],
      !dateRange[1] || stopDate.isAfter(dateRange[1], 'day') ? stopDate : dateRange[1],
    ]
  },
  [null, null]
)
