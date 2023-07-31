export const state = () => ({
  loading: false,
  loadingMessage: null,
  userSearchSystemTabIndex: 2, // 0 - Teams, 1 - Org Users, 2 - Patients
})

export const mutations = {
  SET_LOADING(state, {isLoading, message = null}) {
    state.loading        = isLoading
    state.loadingMessage = message
  },

  SET_USER_SEARCH_SYSTEM_TAB_INDEX(state, index) {
    state.userSearchSystemTabIndex = index;
  },
}

export const actions = {
  SET_LOADING(context, {isLoading, message = null}) {
    context.commit('SET_LOADING', {isLoading, message})
  },

  SET_USER_SEARCH_SYSTEM_TAB_INDEX({ commit }, tabIndex) {
    commit('SET_USER_SEARCH_SYSTEM_TAB_INDEX', tabIndex);
  },
}
