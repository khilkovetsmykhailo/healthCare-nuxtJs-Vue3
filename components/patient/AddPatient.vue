<template>
<b-modal
  id="add-patient"
  modal-class="ex-new-user"
  size="lg"
  hide-footer
  hide-header
>
  <transition
    name="fade"
    mode="out-in"
  >
    <div v-if="currentStep === 'saving'">
      <ex-loading>
        Creating patient...
      </ex-loading>
    </div>
    <div v-if="currentStep === 'complete'">
      <b-row class="mx-0 mt-4">
        <b-col>
          <p>
            Patient successfully created!
          </p>
        </b-col>
      </b-row>
    </div>
    <div v-if="currentStep === 'error'">
      <b-row class="mx-0 mt-4">
        <b-col>
          <p>
            Patient could not be created. Please see error above.
          </p>
        </b-col>
      </b-row>
    </div>
    <ex-step-patient-name
      v-if="currentStep === 'patient-name'"
      @submit="handleGoToStep"
      @action="handleActionPatientName"
    />
    <ex-step-patient-date-of-birth
      v-if="currentStep === 'patient-date-of-birth'"
      @submit="handleGoToStep"
      @action="handleActionPatientDateOfBirth"
    />
    <ex-step-patient-gender
      v-if="currentStep === 'patient-gender'"
      @submit="handleGoToStep"
      @action="handleActionPatientGender"
    />
    <ex-step-patient-height-weight
      v-if="currentStep === 'patient-height-weight'"
      @submit="handleGoToStep"
      @action="handleActionPatientHeightWeight"
    />
    <ex-step-patient-surgery-type
      v-if="currentStep === 'patient-has-surgery'"
      @submit="handleGoToStep"
      @action="handleActionPatientHasSurgery"
    />
    <ex-step-patient-surgery-type
      v-if="currentStep === 'patient-surgery-type'"
      @submit="handleGoToStep"
      @action="handleActionPatientSurgeryType"
    />
    <ex-step-patient-surgery-type-detailed
      v-if="currentStep === 'patient-surgery-type-detailed'"
      @submit="handleGoToStep"
      @action="handleActionPatientSurgeryTypeDetailed"
    />
    <ex-step-patient-surgeon
      v-if="currentStep === 'patient-surgeon'"
      @submit="handleGoToStep"
      @action="handleActionPatientSurgeon"
    />
    <ex-step-patient-surgery-date
      v-if="currentStep === 'patient-surgery-date'"
      @submit="handleGoToStep"
      @action="handleActionPatientSurgeryDate"
    />
    <ex-step-patient-confirm
      v-if="currentStep === 'patient-confirm'"
      @submit="handleGoToStep"
    />
    <ex-step-patient-finish
      v-if="currentStep === 'patient-finish'"
      @submit="handleGoToStep"
    />
  </transition>
</b-modal>
</template>

<script>
import {mapActions, mapGetters, mapState}           from 'vuex'
import ExStepPatientConfirm             from './add-patient-steps/PatientConfirm'
import ExStepPatientFinish              from './add-patient-steps/PatientFinish'
import ExStepPatientName                from './add-patient-steps/PatientName'
import ExStepPatientDateOfBirth         from './add-patient-steps/PatientDateOfBirth'
import ExStepPatientGender              from './add-patient-steps/PatientGender'
import ExStepPatientHeightWeight        from './add-patient-steps/PatientHeightWeight'
import ExStepPatientSurgeryType         from './add-patient-steps/PatientSurgeryType'
import ExStepPatientSurgeryTypeDetailed from './add-patient-steps/PatientSurgeryTypeDetailed'
import ExStepPatientSurgeon             from './add-patient-steps/PatientSurgeon'
import ExStepPatientSurgeryDate         from './add-patient-steps/PatientSurgeryDate'

export default {
  name: 'ex-new-user',
  components: {
    ExStepPatientConfirm,
    ExStepPatientFinish,
    ExStepPatientName,
    ExStepPatientDateOfBirth,
    ExStepPatientGender,
    ExStepPatientHeightWeight,
    ExStepPatientSurgeryType,
    ExStepPatientSurgeryTypeDetailed,
    ExStepPatientSurgeon,
    ExStepPatientSurgeryDate,
  },
  data() {
    return {
      currentStep: 'patient-name',
    }
  },
  computed: {
    ...mapState('patient/new', ['user', 'error']),
    ...mapGetters('organization', ['patientOrganizationRole']),
  },
  mounted() {
    this.busOn('add-patient:start', this.start)
  },
  methods: {
    ...mapActions('patient/new', {
      clearAll: 'CLEAR_ALL',
      clearError: 'CLEAR_ERROR',
      updateUser: 'UPDATE_USER',
      updateProfile: 'UPDATE_PROFILE',
      updateEvent: 'UPDATE_EVENT',
    }),
    handleActionPatientName({ firstName, lastName, email }) {
      this.updateUser({ firstName, lastName, email })
    },
    handleActionPatientDateOfBirth(dob) {
      this.updateUser({ date_of_birth: dob instanceof Date
        ? dob.toISOString().split('T')[0]
        : dob
      })
    },
    handleActionPatientGender(gender) {
      this.updateUser({ gender })
    },
    handleActionPatientHeightWeight({ height, weight }) {
      this.updateProfile({ height, weight })
    },
    handleActionPatientHasSurgery(hasSurgery) {
      // TODO update event
    },
    handleActionPatientSurgeryType({ type, type_secondary }) {
      this.updateEvent({ type, type_secondary })
    },
    handleActionPatientSurgeryTypeDetailed(event_id) {
      this.updateEvent({ event_id })
    },
    handleActionPatientSurgeon(user_organization_role_id) {
      this.updateEvent({ user_organization_role_id })
    },
    handleActionPatientSurgeryDate(date) {
      this.updateEvent({ date: date instanceof Date ? date.toISOString().split('T')[0] : date })
    },
    start() {
      this.clearAll()
      this.currentStep = 'patient-name'
      this.$bvModal.show('add-patient')
    },
    handleGoToStep(step) {
      this.updateUser({ roles: [this.patientOrganizationRole.id] })
      this.clearError()
      this.currentStep = step
    },
  },
}
</script>
