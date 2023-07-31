import recoveryPlanActivitiesFields from '../../fields/recoveryPlanActivity'

export default (
  `
  query (
    $recoveryPlanId: Int!,
    $dateStart: Date,
    $dateStop: Date,
  ) {
    recoveryPlanActivities (
      recoveryPlanId: $recoveryPlanId,
      dateStart: $dateStart,
      dateStop: $dateStop,
    ) {
      ${recoveryPlanActivitiesFields()}
    }
  }
  `
)
