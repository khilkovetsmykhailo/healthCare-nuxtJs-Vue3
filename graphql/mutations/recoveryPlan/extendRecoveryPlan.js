export default (
  `
  mutation (
    $recoveryPlanId: Int!,
    $extensionWeeks: Int!,
  ) {
    extendRecoveryPlan (
      recoveryPlanId: $recoveryPlanId,
      extensionWeeks: $extensionWeeks,
    )
  }
  `
)
