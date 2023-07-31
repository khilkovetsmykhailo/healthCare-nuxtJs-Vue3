import makeRequest from '../util/graphql/makeRequest'
import extractNodes from '../util/graphql/extractNodes'
import queryOrganizations from '../graphql/queries/organization/organizations'

export const state = () => ({
  allOrganizations: null,
  errors: [],
})

export const mutations = {
  SET(_state, [which, what]) {
    _state[which] = what
  },
}

export const actions = {
  async GET_ALL_ORGANIZATIONS({ commit }) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryOrganizations,
    })

    if (data && !errors.length) {
      commit('SET', ['allOrganizations', extractNodes(data.organizations)])
    } else {
      commit('SET_ERRORS', errors)
    }
  },
}
