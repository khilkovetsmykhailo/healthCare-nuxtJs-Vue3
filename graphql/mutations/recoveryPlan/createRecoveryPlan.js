export default (
  `
  mutation (
    $patientId: Int!,
    $surgeryId: Int!,
    $surgeonId: Int,
    $surgerySpecificationId: Int!,
  ) {
    createRecoveryPlan (
      patientId: $patientId,
      surgeryId: $surgeryId,
      surgeonId: $surgeonId,
      surgerySpecificationId: $surgerySpecificationId,
    ) {
      id
      name
    }
  }
  `
)
