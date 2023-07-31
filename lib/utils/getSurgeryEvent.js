export default (recoveryPlan) => (
  recoveryPlan.event_assignment && recoveryPlan.event_assignment.event.type === 'surgery' ?
    recoveryPlan.event_assignment
  : null
)
