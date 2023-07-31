import recoveryPlanActivityFields from '../../fields/recoveryPlanActivity'

export default (
  `
  mutation (
    $recoveryPlanActivity: UpdateRecoveryPlanActivityInput!,
  ) {
    updateRecoveryPlanActivity (
      recoveryPlanActivity: $recoveryPlanActivity,
    ) {
      ${recoveryPlanActivityFields(false)}
    }
  }
  `
)
