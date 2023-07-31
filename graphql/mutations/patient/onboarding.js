import patientFields from '../../fields/patient'

export default (
  `
  mutation (
    $patientId: Int!,
    $assistiveDevices: [String!]!,
    $healthConditions: [String!]!,
    $personalGoals: String!,
  ) {
    patientOnboarding (
      patientId: $patientId,
      assistiveDevices: $assistiveDevices,
      healthConditions: $healthConditions,
      personalGoals: $personalGoals,
    ) {
      ${patientFields}
    }
  }
  `
)
