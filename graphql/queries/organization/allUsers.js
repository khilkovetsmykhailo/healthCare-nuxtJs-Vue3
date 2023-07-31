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
    $patientsAfter: String,
    $patientsBefore: String,
  ) {
    organizationAdministrators(
      organizationId: $organizationId,
      search: $search,
      after: $administratorsAfter,
      before: $administratorsBefore,
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
    organizationPatients(
      organizationId: $organizationId,
      search: $search,
      after: $patientsAfter,
      before: $patientsBefore,
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
