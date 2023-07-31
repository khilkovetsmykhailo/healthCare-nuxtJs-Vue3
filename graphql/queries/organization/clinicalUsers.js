import userFields from '../../fields/user';
import pageInfo from '../../fields/pageInfo'

export default (
  `
  query (
    $organizationId: Int!,
    $search: String,
    $administratorsAfter: String,
    $administratorsBefore: String,
    $healthCareProvidersAfter: String,
    $healthCareProvidersBefore: String,
  ) {
    organizationAdministrators(
      organizationId: $organizationId,
      search: $search,
      after: $administratorsAfter,
      before: $administratorsBefore,
      first: 5,
      last: 5
    ) {
      ${pageInfo}
      nodes {
        node {
          id
          User {
            ${userFields}
          }
        }
      }
    }
    organizationHealthCareProviders(
      organizationId: $organizationId,
      search: $search,
      after: $healthCareProvidersAfter,
      before: $healthCareProvidersBefore,
      first: 5,
      last: 5
    ) {
      ${pageInfo}
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
