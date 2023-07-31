import organizationFields from '../../fields/organization'
import userFields from '../../fields/user'

export default (
  `
  query (
     $email: String,
     $id: String,
     $withOrganizations: Boolean = false,
     $withOrganizationRoles: Boolean = false
  ) {
    user(
      email: $email,
      id: $id,
    ) {
      ${userFields}
      Roles {
        id
        description
      }
      OrganizationAdministrators @include(if: $withOrganizationRoles) {
        id
        Organization {
          ${organizationFields}
        }
      }
      OrganizationHealthCareProviders @include(if: $withOrganizationRoles) {
        id
        hcpType
        Organization {
          ${organizationFields}
        }
      }
      OrganizationPatients @include(if: $withOrganizationRoles) {
        id
        Organization {
          ${organizationFields}
        }
      }
    }
    userOrganizations(userId: $id, email: $email) @include(if: $withOrganizations) {
      ${organizationFields}
    }
  }
  `
)
