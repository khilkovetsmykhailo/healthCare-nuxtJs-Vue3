import makeRequest from '../../util/graphql/makeRequest'
import queryPatient from '../../graphql/queries/patient/patient'

export const state = () => ({
  patient: null,
  errors: null,
})

export const getters = {
  patientFullName({ patient }) {
    return `${patient.User.firstName} ${patient.User.lastName}`
  },

  recoveryPlan({ patient }) {
    return patient.RecoveryPlan || null
  },

  planSurgery({ patient }) {
    return patient.RecoveryPlan && patient.RecoveryPlan.RecoveryPlanSurgery
      ? patient.RecoveryPlan.RecoveryPlanSurgery
      : null
  },

  planSurgeon({ patient }) {
    return patient.RecoveryPlan &&
    patient.RecoveryPlan.RecoveryPlanSurgery &&
    patient.RecoveryPlan.RecoveryPlanSurgery.Surgeon
      ? patient.RecoveryPlan.RecoveryPlanSurgery.Surgeon
      : null
  },

  primaryPhysicalTherapist({ patient }) {
    if (!patient.PhysicalTherapists) return null
    return patient.PhysicalTherapists.find(({ PhysicalTherapistAssignment: { active } }) => active)
  },
}

export const mutations = {
  SET(_state, [which, what]) {
    _state[which] = what
  },

  ADD_PHYSICAL_THERAPIST(_state, physicalTherapist) {
    _state.patient.PhysicalTherapists = (_state.patient.PhysicalTherapists || []).concat(physicalTherapist)
  },

  REMOVE_PHYSICAL_THERAPIST(_state, physicalTherapistId) {
    _state.patient.PhysicalTherapists = _state.patient.PhysicalTherapists.filter(({ id }) => (
      id !== physicalTherapistId
    ))
  },

  UPDATE_PHYSICAL_THERAPIST(_state, physicalTherapist) {
    _state.patient.PhysicalTherapists = _state.patient.PhysicalTherapists.map((existingPhysicalTherapist) => (
      physicalTherapist.id === existingPhysicalTherapist.id
        ? {
          ...existingPhysicalTherapist,
          ...physicalTherapist,
        }
        : existingPhysicalTherapist
    ))
  },

  SET_PLAN_SURGERY(_state, planSurgery) {
    _state.patient.RecoveryPlan.RecoveryPlanSurgery = {
      ..._state.patient.RecoveryPlan.RecoveryPlanSurgery,
      ...planSurgery,
    }
  },

  SET_ERRORS(_state, errors) {
    _state.errors = errors
  },

  CLEAR(_state) {
    _state.patient = null
    _state.errors = null
  },
}

export const actions = {
  async GET_PATIENT({ commit }, id) {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryPatient,
      variables: {
        id,
      },
    })

    if (data && !errors.length) {
      commit('SET', ['patient', data.organizationPatient])
    } else {
      commit('SET_ERRORS', errors)
    }
  },
}
