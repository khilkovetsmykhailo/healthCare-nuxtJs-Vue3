import recoveryPlanActivityFields from '../../fields/recoveryPlanActivity'

export default (
  `
  mutation (
    $recoveryPlanActivity: CreateRecoveryPlanActivityInput!,
  ) {
    createRecoveryPlanActivity (
      recoveryPlanActivity: $recoveryPlanActivity,
    ) {
      ${recoveryPlanActivityFields(false)}
    }
  }
  `
)
