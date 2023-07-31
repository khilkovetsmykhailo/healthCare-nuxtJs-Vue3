export default (
  `
  mutation (
    $patientId: Int!,
    $recoveryPlanId: Int!,
    $activityId: Int!,
    $planActivityId: Int!,
    $duration: Int!,
    $day: String,
    $time: String,
    $metadata: CreateCompletedActivityMetadata,
  ) {
    createCompletedActivity (
      patientId: $patientId,
      recoveryPlanId: $recoveryPlanId,
      activityId: $activityId,
      planActivityId: $planActivityIdd,
      duration: $duration,
      day: $day,
      time: $time,
      metadata: $metadata,
    ) {
      id
    }
  }
  `
)
