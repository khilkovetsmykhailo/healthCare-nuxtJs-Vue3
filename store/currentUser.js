import makeRequest from '../util/graphql/makeRequest'
import getCurrentOrganizationRoles from '../util/user/getCurrentOrganizationRoles'
import queryUser from '../graphql/queries/user/user'

export const state = () => ({
  user: null,
  organizations: [],
  errors: [],
})

export const getters = {
  /**
   * Returns the highest role, given the current organization.
   *
   * @param user
   * @param _getters
   * @param organization
   * @returns {string|null}
   */
  highestRole({ user }, _getters, { organization }) {
    // System administrator, highest role
    if (user.Roles.find((role) => role.id === 'administrator')) return 'systemAdministrator'

    // Currently viewed organization
    if (organization.organization) {
      const organizationRoles = getCurrentOrganizationRoles(user, organization.organization.id)

      if (organizationRoles.find(({ type }) => type === 'administrator')) {
        return 'organizationAdministrator'
      }

      const hcpRole = organizationRoles.find(({ type }) => type === 'healthCareProvider')
      if (hcpRole) {
        // If an HCP is a physical therapist, then THAT is their highest role, not HCP
        if (hcpRole.organizationRole.hcpType === 'PHYSICAL_THERAPIST') return 'organizationPhysicalTherapist'

        return 'organizationHealthCareProvider'
      }

      if (organizationRoles.find(({ type }) => type === 'patient')) {
        return 'organizationPatient'
      }
    }

    // User, lowest role
    return 'user'
  },

  /**
   * Returns the highest role, given the current organization.
   *
   * @param state
   * @param highestRole
   * @returns {number}
   */
  highestRoleIndex(state, { highestRole }) {
    return [
      'user', // 0
      'organizationPatient', // 1
      'organizationPhysicalTherapist', // 2
      'organizationHealthCareProvider', // 3
      'organizationAdministrator', // 4
      'systemAdministrator', // 5
    ].indexOf(highestRole)
  },

  organizationRoles({ user }, _getters, { organization }) {
    if (!organization) return []
    return getCurrentOrganizationRoles(user, organization.organization?.id)
  },

  administrator({ user }, { organizationRoles }) {
    return organizationRoles.find(({ type }) => type === 'administrator')
  },

  healthCareProvider({ user }, { organizationRoles }) {
    return organizationRoles.find(({ type }) => type === 'healthCareProvider')
  },

  patient({ user }, { organizationRoles }) {
    return organizationRoles.find(({ type }) => type === 'patient')
  },

  fullName({ user }) {
    return `${user.firstName} ${user.lastName}`
  },
}

export const mutations = {
  _SET(_state, [which, what]) {
    _state[which] = what
  },

  SET_USER(_state, user) {
    _state.user = user
  },

  SET_ORGANIZATIONS(_state, organizations) {
    _state.organizations = organizations
  },

  SET_ERRORS(_state, errors) {
    _state.errors = errors
  },
}

export const actions = {
  async GET_USER({ commit }) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryUser,
      variables: {
        id: this.$cookies.get('authUserId'),
        withOrganizations: true,
        withOrganizationRoles: true,
      },
    })

    if (data && !errors.length) {
      commit('SET_USER', data.user)
      commit('SET_ORGANIZATIONS', data.userOrganizations)
    } else {
      commit('SET_ERRORS', errors)
    }
  },
}
