import careTeamFields from '../../fields/careTeam'

export default (
  `
  query (
    $id: Int!,
  ) {
    careTeam(id: $id) {
      ${careTeamFields}
    }
  }
  `
)
