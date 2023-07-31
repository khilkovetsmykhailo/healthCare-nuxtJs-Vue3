import makeRequest from '../../util/graphql/makeRequest'
import queryCareTeam from '../../graphql/queries/careTeam/careTeam'

export const state = () => ({
  careTeam: null,
  errors: null,
})

export const getters = {
  administrators({ careTeam }) {
    return careTeam.Administrators
  },

  healthCareProviders({ careTeam }) {
    return careTeam.HealthCareProviders
  },

  patients({ careTeam }) {
    return careTeam.Patients
  },

  clinicalUsers({ careTeam }) {
    return [
      ...(careTeam.Administrators || []).map((administrator) => {
        administrator.type = 'administrator'
        return administrator
      }),
      ...(careTeam.HealthCareProviders || []).map((healthCareProvider) => {
        healthCareProvider.type = 'healthCareProvider'
        return healthCareProvider
      }),
    ]
  },

  members({ careTeam }) {
    return [
      ...(careTeam.Administrators || []).map((administrator) => {
        administrator.type = 'administrator'
        return administrator
      }),
      ...(careTeam.HealthCareProviders || []).map((healthCareProvider) => {
        healthCareProvider.type = 'healthCareProvider'
        return healthCareProvider
      }),
      ...(careTeam.Patients || []).map((patient) => {
        patient.type = 'patient'
        return patient
      }),
    ]
  },
}

export const mutations = {
  SET(_state, [which, what]) {
    _state[which] = what
  },

  UPDATE_CARE_TEAM(_state, careTeam) {
    Object.keys(careTeam).forEach((careTeamField) => {
      _state.careTeam[careTeamField] = careTeam[careTeamField]
    })
  },

  REMOVE_MEMBER(_state, [memberType, memberId]) {
    switch (memberType) {
      case 'administrator':
        _state.careTeam.Administrators = _state.careTeam.Administrators.filter(({ id }) => id !== memberId)
        break
      case 'healthCareProvider':
        _state.careTeam.HealthCareProviders = _state.careTeam.HealthCareProviders.filter(({ id }) => id !== memberId)
        break
      case 'patient':
        _state.careTeam.Patients = _state.careTeam.Patients.filter(({ id }) => id !== memberId)
        break
    }
  },

  ADD_MEMBER(_state, [memberType, member]) {
    switch (memberType) {
      case 'administrator':
        _state.careTeam.Administrators = _state.careTeam.Administrators.concat(member)
        break
      case 'healthCareProvider':
        _state.careTeam.HealthCareProviders = _state.careTeam.HealthCareProviders.concat(member)
        break
      case 'patient':
        _state.careTeam.Patients = _state.careTeam.Patients.concat(member)
        break
    }
  },

  SET_ERRORS(_state, errors) {
    _state.errors = errors
  },

  CLEAR(_state) {
    _state.careTeam = null
    _state.errors = null
  }
}

export const actions = {
  async GET_CARE_TEAM({ commit }, id) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryCareTeam,
      variables: {
        id,
      },
    })

    if (data && !errors.length) {
      commit('SET', ['careTeam', data.careTeam])
    } else {
      commit('SET_ERRORS', errors)
    }
  },
}
