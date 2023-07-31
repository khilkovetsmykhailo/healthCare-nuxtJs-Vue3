import userFields from '../../fields/user'

export default (
  `
  mutation (
    $user: CreateUserInput!
    $organizationRoleType: String!,
    $organizationRoleMeta: CreateUserOrganizationRoleMetaInput,
    $organizationId: Int!,
    $careTeamId: Int,
  ) {
    createUser (
      user: $user,
      organizationRoleType: $organizationRoleType,
      organizationRoleMeta: $organizationRoleMeta,
      organizationId: $organizationId,
      careTeamId: $careTeamId
    ) {
      ${userFields}
      administratorId
      healthCareProviderId
      patientId
    }
  }
  `
)
