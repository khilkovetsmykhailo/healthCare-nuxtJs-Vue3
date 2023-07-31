export default (
  `
  query (
    $recoveryPlanId: Int!
  ) {
    recoveryPlanMilestones (recoveryPlanId: $recoveryPlanId) {
      id
      completedOn
      skippedOn
      Milestone {
        id
        name
        description
      }
    }
  }
  `
)
