import userFields from '../../fields/user';

export default (
  `
  query (
    $organizationId: Int!,
    $search: String
  ) {
    organizationHealthCareProviders(
      organizationId: $organizationId,
      search: $search
    ) {
      nodes {
        node {
          id
          User {
            ${userFields}
          }
        }
      }
    }
  }
  `
)
