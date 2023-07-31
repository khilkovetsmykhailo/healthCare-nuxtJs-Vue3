import getAllOrganizationRoles from './getAllOrganizationRoles'

export default (user, organizationId) => (
  getAllOrganizationRoles(user).filter(({ organizationRole }) => organizationRole.Organization.id === organizationId)
)
