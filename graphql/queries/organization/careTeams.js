import pageInfo from '../../fields/pageInfo'

export default (
  `
  query (
    $organizationId: Int!,
    $search: String,
    $after: String,
    $before: String
  ) {
    careTeams(
      organizationId: $organizationId,
      search: $search,
      after: $after,
      before: $before
    ) {
      ${pageInfo}
      nodes {
        administratorsCount
        healthCareProvidersCount
        patientsCount
        node {
          id
          name
          description
          pictureFileId
        }
      }
    }
  }
  `
)
