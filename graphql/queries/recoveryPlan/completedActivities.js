export default (
  `
  query (
    $date: Date,
    $patientId: Int,
  ) {
    completedActivities (
      date: $date,
      patientId: $patientId,
    ) {
      id
      planActivityId
      activityId
      patientId
      duration
      day
      time
    }
  }
  `
)
