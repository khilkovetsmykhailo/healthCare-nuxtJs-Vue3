import makeRequest from '../util/graphql/makeRequest'
import queryAllStatic from '../graphql/queries/static'

export const state = () => ({
  surgeries: null,
  retrieved: false,
  errors: [],
})

export const getters = {
  surgeryTypes({ surgeries }) {
    return surgeries.reduce((types, surgery) => (
      types.find(({ id }) => id === surgery.Type.id) === undefined
        ? types.concat({ ...surgery.Type })
        : types
    ), [])
  },
}

export const mutations = {
  SET(_state, [which, what]) {
    _state[which] = what
  },

  SET_ERRORS(_state, errors) {
    _state.errors = errors
  },
}

export const actions = {
  async GET_ALL({ commit }) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryAllStatic,
    })

    if (data && !errors.length) {
      commit('SET', ['surgeries', data.surgeries])
    } else if (errors) {
      commit('SET_ERRORS', errors)
    }

    commit('SET', ['retrieved', true])
  },
}
