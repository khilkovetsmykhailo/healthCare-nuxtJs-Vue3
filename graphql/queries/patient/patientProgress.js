export default (
  `
  query (
    $recoveryPlanId: Int!,
  ) {
    patientProgress(
      recoveryPlanId: $recoveryPlanId
    ) {
      currentDayStreak
      rehabTime
      totalSessions
      totalExercises
      completedSessions
    }
  }
  `
)
