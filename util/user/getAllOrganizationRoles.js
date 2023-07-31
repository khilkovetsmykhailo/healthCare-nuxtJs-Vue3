export default (user) => (
  [
    ...user.OrganizationAdministrators.map((organizationRole) => ({organizationRole, type: 'administrator'})),
    ...user.OrganizationHealthCareProviders.map((organizationRole) => ({organizationRole, type: 'healthCareProvider'})),
    ...user.OrganizationPatients.map((organizationRole) => ({organizationRole, type: 'patient'})),
  ]
)
