export default (
  `
  mutation (
    $patientId: Int!
    $recoveryPlanId: Int!,
    $score: Int!,
    $completedActivityId: Int,
  ) {
    createPatientPain (
      patientId: $patientId,
      recoveryPlanId: $recoveryPlanId,
      score: $score,
      completedActivityId: $completedActivityId,
    ) {
      id
    }
  }
  `
)
