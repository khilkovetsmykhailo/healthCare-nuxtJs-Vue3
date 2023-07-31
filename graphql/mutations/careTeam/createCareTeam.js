import careTeamFields from '../../fields/careTeam.simple'

export default (
  `
  mutation (
    $careTeam: CreateCareTeamInput!,
  ) {
    createCareTeam(
      careTeam: $careTeam,
    ) {
      ${careTeamFields}
    }
  }
  `
)
