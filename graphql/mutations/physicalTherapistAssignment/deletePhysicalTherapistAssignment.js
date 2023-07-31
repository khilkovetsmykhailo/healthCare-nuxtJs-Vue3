export default (
  `
  mutation (
    $id: Int!,
  ) {
    deletePhysicalTherapistAssignment (
      id: $id,
    )
  }
  `
)
