import makeRequest from '../../util/graphql/makeRequest'
import extractNodes from '../../util/graphql/extractNodes'
import queryOrganization from '../../graphql/queries/organization/organization'
import queryCareTeams from '../../graphql/queries/organization/careTeams'
import queryPatients from '../../graphql/queries/organization/patients'
import queryClinicalUsers from '../../graphql/queries/organization/clinicalUsers'

const getDefaultPageInfo = () => ({ hasPrevious: false, hasNext: false, startCursor: null, endCursor: null })
const defaultPagination = { before: null, after: null }

export const state = () => ({
  organization: null,
  careTeams: null,
  administrators: null,
  healthCareProviders: null,
  patients: null,
  pageInfo: {
    careTeams: getDefaultPageInfo(),
    administrators: getDefaultPageInfo(),
    healthCareProviders: getDefaultPageInfo(),
    patients: getDefaultPageInfo(),
  },
  errors: null,
})

export const mutations = {
  SET(_state, [which, what]) {
    _state[which] = what
  },

  SET_PAGE_INFO(_state, [which, pageInfo]) {
    _state.pageInfo[which] = pageInfo
  },

  SET_ERRORS(_state, errors) {
    _state.errors = errors
  },

  ADD_CARE_TEAM(_state, careTeam) {
    _state.careTeams = _state.careTeams.concat(careTeam)
  },

  REMOVE_CARE_TEAM(_state, careTeamId) {
    _state.careTeams = _state.careTeams.filter(({ id }) => id !== careTeamId)
  },

  CLEAR(_state) {
    _state.organization = null
    _state.careTeams = null
    _state.administrators = null
    _state.healthCareProviders = null
    _state.patients = null
    _state.pageInfo = {
      careTeams: getDefaultPageInfo(),
      administrators: getDefaultPageInfo(),
      healthCareProviders: getDefaultPageInfo(),
      patients: getDefaultPageInfo(),
    }
  },
}

export const actions = {
  async GET_ORGANIZATION({ commit }, slug) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryOrganization,
      variables: {
        slug,
      },
    })

    if (data && !errors.length) {
      commit('SET', ['organization', data.organization])
    } else {
      commit('SET_ERRORS', errors)
    }

    return { data, errors }
  },

  async GET_CARE_TEAMS({ commit, state }, { search, pagination = defaultPagination } = {}) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryCareTeams,
      variables: {
        organizationId: state.organization.id,
        search,
        ...pagination,
      },
    })

    if (data && !errors.length) {
      commit('SET', ['careTeams', extractNodes(data.careTeams, { withNodeContext: true })])
    } else {
      commit('SET_ERRORS', errors)
    }
  },

  async GET_CLINICAL_USERS(
    { commit, state },
    {
      search,
      administratorsPagination = defaultPagination,
      healthCareProvidersPagination = defaultPagination,
    } = {},
  ) {
    const {
      data: {
        organizationAdministrators: administrators,
        organizationHealthCareProviders: healthCareProviders,
      },
      errors,
    } = await makeRequest(this.$axios, {
      query: queryClinicalUsers,
      variables: {
        organizationId: state.organization.id,
        administratorsAfter: administratorsPagination.after,
        administratorsBefore: administratorsPagination.before,
        healthCareProvidersAfter: healthCareProvidersPagination.after,
        healthCareProvidersBefore: healthCareProvidersPagination.before,
        search,
      },
    })

    if (administrators && healthCareProviders && !errors.length) {
      commit('SET', [
        'administrators',
        extractNodes(administrators).map((orgRole) => ({
          type: 'Administrator',
          ...orgRole,
        })),
      ])
      commit('SET', [
        'healthCareProviders',
        extractNodes(healthCareProviders).map((orgRole) => ({
          type: 'Health Care Provider',
          ...orgRole,
        })),
      ])

      commit('SET_PAGE_INFO', ['administrators', administrators.pageInfo])
      commit('SET_PAGE_INFO', ['healthCareProviders', healthCareProviders.pageInfo])
    } else {
      commit('SET_ERRORS', errors)
    }
  },

  async GET_PATIENTS(
    { commit, state },
    {
      order,
      orderBy = '$User.firstName$',
      pagination = defaultPagination,
      physicalTherapistId, // limit query to patients belonging to this PT
      search,
      surgery,
    } = {},
  ) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryPatients,
      variables: {
        order,
        orderBy,
        organizationId: state.organization.id,
        physicalTherapistId,
        search,
        surgery,
        withStats: true,
        withSurgery: true,
        ...pagination,
      },
    })

    if (data && !errors.length) {
      commit('SET', ['patients', extractNodes(data.organizationPatients)])
      commit('SET_PAGE_INFO', ['patients', data.organizationPatients.pageInfo])
    } else {
      commit('SET_ERRORS', errors)
    }
  },
}
