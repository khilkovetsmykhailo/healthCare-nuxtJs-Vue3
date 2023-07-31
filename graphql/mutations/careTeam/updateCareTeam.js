import careTeamFields from '../../fields/careTeam.simple'

export default (
  `
  mutation (
    $careTeam: UpdateCareTeamInput!,
  ) {
    updateCareTeam(
      careTeam: $careTeam,
    ) {
      ${careTeamFields}
    }
  }
  `
)
