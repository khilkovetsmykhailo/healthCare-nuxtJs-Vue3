import userFields from './user';
import recoveryPlanSurgeryFields from './recoveryPlanSurgeryFields';

export default (
  `
  id
  averageCompliance
  averagePain
  healthConditions
  assistiveDevices
  personalGoals
  PhysicalTherapists {
    id
    User {
      ${userFields}
    }
    PhysicalTherapistAssignment {
      id
      active
    }
  }
  User {
    ${userFields}
  }
  RecoveryPlan (withSurgery: $withSurgery) @include(if: $withRecoveryPlan) {
    id
    name
    planType
    RecoveryPlanSurgery @include(if: $withSurgery) {
      ${recoveryPlanSurgeryFields}
    }
  }
  Surgery {
    id
    name
  }
  `
)
