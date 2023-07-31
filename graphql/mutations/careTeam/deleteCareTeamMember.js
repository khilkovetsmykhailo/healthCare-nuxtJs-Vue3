export default (
  `
  mutation (
    $careTeamId: Int!,
    $administratorId: Int,
    $healthCareProviderId: Int,
    $patientId: Int,
  ) {
    deleteCareTeamMember(
      careTeamId: $careTeamId,
      administratorId: $administratorId,
      healthCareProviderId: $healthCareProviderId,
      patientId: $patientId,
    )
  }
  `
)
