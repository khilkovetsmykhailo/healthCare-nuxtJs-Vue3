export const state = () => ({
  currentOrganizationUser: null,
  currentChannel: null,
})

export const mutations = {
  SET_CURRENT_ORGANIZATION_USER(_state, organizationUser) {
    _state.currentOrganizationUser = organizationUser
  },

  SET_CURRENT_CHANNEL(_state, channel) {
    _state.currentChannel = {
      id: channel.id,
      name: channel.name,
    }
  },

  RESET(_state) {
    _state.currentOrganizationUser = null
    _state.currentChannel = null
  },
}
