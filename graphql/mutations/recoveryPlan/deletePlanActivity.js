export default (
  `
  mutation (
    $id: Int!,
) {
    deleteRecoveryPlanActivity (
      id: $id,
    )
  }
  `
)

