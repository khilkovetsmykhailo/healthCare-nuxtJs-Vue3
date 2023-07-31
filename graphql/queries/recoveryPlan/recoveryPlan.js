import recoveryPlanSurgeryFields from '../../fields/recoveryPlanSurgeryFields'
import recoveryPlanActivitiesFields from '../../fields/recoveryPlanActivity'

export default (
  `
  query (
    $id: Int!
  ) {
    recoveryPlan (id: $id) {
      id
      name
      PlanActivities {
        ${recoveryPlanActivitiesFields()}
      }
      RecoveryPlanSurgery {
        ${recoveryPlanSurgeryFields}
      }
    }
  }
  `
)
