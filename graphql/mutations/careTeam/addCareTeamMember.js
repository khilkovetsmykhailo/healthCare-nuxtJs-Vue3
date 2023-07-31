export default (
  `
  mutation (
    $careTeamId: Int!,
    $administratorId: Int,
    $healthCareProviderId: Int,
    $patientId: Int,
  ) {
    addCareTeamMember(
      careTeamId: $careTeamId,
      administratorId: $administratorId,
      healthCareProviderId: $healthCareProviderId,
      patientId: $patientId,
    )
  }
  `
)
