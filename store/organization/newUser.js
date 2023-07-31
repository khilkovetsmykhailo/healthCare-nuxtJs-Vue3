export const state = () => ({
  createdUser: null,
  organizationRoleType: null,
  organizationRoleMeta: {},
  user: {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    dateOfBirth: null,
    gender: null,
  },
  hasSurgery: null,
  surgery: {
    surgery: null,
    type: null,
    specification: null,
    date: null,
    surgeon: null,
  },
  careTeam: null,
})

export const mutations = {
  SET_ORGANIZATION_ROLE_TYPE(_state, type) {
    _state.organizationRoleType = type
  },

  SET_ORGANIZATION_ROLE_META(_state, meta) {
    _state.organizationRoleMeta = meta
  },

  SET_USER_FIELD(_state, [which, what]) {
    _state.user[which] = what
  },

  SET_HAS_SURGERY(_state, hasSurgery) {
    _state.hasSurgery = hasSurgery
  },

  SET_SURGERY_FIELD(_state, [which, what]) {
    _state.surgery[which] = what
  },

  SET_CARE_TEAM(_state, careTeam) {
    _state.careTeam = careTeam
  },

  SET_CREATED_USER(_state, user) {
    _state.createdUser = user
  },

  CLEAR_ALL(_state) {
    _state.createdUser = null
    _state.organizationRoleType = null
    _state.user.firstName = null
    _state.user.lastName = null
    _state.user.email = null
    _state.user.phone = null
    _state.user.dateOfBirth = null
    _state.user.gender = null
    _state.hasSurgery = null
    _state.surgery.surgery = null
    _state.surgery.type = null
    _state.surgery.specification = null
    _state.surgery.date = null
    _state.surgery.surgeon = null
    _state.careTeam = null
  },
}
