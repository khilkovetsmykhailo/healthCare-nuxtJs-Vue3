import recoveryPlanSurgeryFields from '../../fields/recoveryPlanSurgeryFields';

export default (
  `
  mutation (
    $recoveryPlanSurgery: UpdateRecoveryPlanSurgeryInput!
  ) {
    updateRecoveryPlanSurgery (recoveryPlanSurgery: $recoveryPlanSurgery) {
      ${recoveryPlanSurgeryFields}
    }
  }
  `
)
