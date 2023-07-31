<template>
  <b-modal
    id="new-user"
    modal-class="ex-new-user"
    size="lg"
    hide-footer
    hide-header
    no-close-on-backdrop
    no-close-on-esc
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <ex-step-user-organization-role
        v-if="currentStep === 'user-organization-role'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
      />

      <ex-step-user-email
        v-if="currentStep === 'user-email'"
        @skip-to-step="handleGoToStep"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :organization-role-type="organizationRoleType"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-details
        v-if="currentStep === 'user-details'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-date-of-birth
        v-if="currentStep === 'user-date-of-birth'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-gender
        v-if="currentStep === 'user-gender'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-has-surgery
        v-if="currentStep === 'user-has-surgery'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        @go-to-step="handleGoToStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-surgery-type
        v-if="currentStep === 'user-surgery-type'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-surgery-details
        v-if="currentStep === 'user-surgery-details'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-surgery-specification
        v-if="currentStep === 'user-surgery-specification'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-surgery-date
        v-if="currentStep === 'user-surgery-date'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-surgery-surgeon
        v-if="currentStep === 'user-surgery-surgeon'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-care-team
        v-if="currentStep === 'user-care-team'"
        @next="handleGoToNextStep"
        @back="handleGoToPreviousStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-confirm
        v-if="currentStep === 'user-confirm'"
        @next="handleGoToNextStep"
        @back="handleGoToStep(surgery.date !== null ? 'user-surgery-surgeon' : 'user-care-team')"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />

      <ex-step-user-finish
        v-if="currentStep === 'user-finish'"
        @next="handleGoToNextStep"
        :step="currentStepIndex + 1"
        :total-steps="steps.length"
      />
    </transition>

    <div class="mb-5 mt-4 d-flex justify-content-center">
      <b-button
        variant="link"
        size="lg"
        @click="handleCancel"
      >
        {{ currentStepIndex + 1 < steps.length ? 'Cancel' : 'Close' }}
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import ExStep from '../../Step'
import ExStepUserConfirm from './steps/UserConfirm'
import ExStepUserDateOfBirth from './steps/UserDateOfBirth'
import ExStepUserDetails from './steps/UserDetails'
import ExStepUserEmail from './steps/UserEmail'
import ExStepUserHasSurgery from './steps/UserHasSurgery'
import ExStepUserSurgeryDate from './steps/UserSurgeryDate'
import ExStepUserSurgeryDetails from './steps/UserSurgeryDetails'
import ExStepUserSurgerySpecification from './steps/UserSurgerySpecification'
import ExStepUserSurgeryType from './steps/UserSurgeryType'
import ExStepUserSurgerySurgeon from './steps/UserSurgerySurgeon'
import ExStepUserCareTeam from './steps/UserCareTeam'
import ExStepUserFinish from './steps/UserFinish'
import ExStepUserGender from './steps/UserGender'
import ExStepUserOrganizationRole from './steps/UserOrganizationRole'

export default {
  name: 'ex-new-user',
  components: {
    ExStep,
    ExStepUserConfirm,
    ExStepUserDateOfBirth,
    ExStepUserDetails,
    ExStepUserEmail,
    ExStepUserSurgeryDate,
    ExStepUserHasSurgery,
    ExStepUserSurgeryDetails,
    ExStepUserSurgerySpecification,
    ExStepUserSurgeryType,
    ExStepUserSurgerySurgeon,
    ExStepUserCareTeam,
    ExStepUserFinish,
    ExStepUserGender,
    ExStepUserOrganizationRole,
  },
  data() {
    return {
      currentStep: 'user-organization-role',
    }
  },
  computed: {
    steps() {
      switch (this.organizationRoleType) {
        case 'administrator':
          return [
            'user-organization-role',
            'user-email',
            'user-details',
            'user-date-of-birth',
            'user-confirm',
            'user-finish',
          ]
        case 'healthCareProvider':
          return [
            'user-organization-role',
            'user-email',
            'user-details',
            'user-date-of-birth',
            'user-care-team',
            'user-confirm',
            'user-finish',
          ]
        case 'patient':
          return [
            'user-organization-role',
            'user-email',
            'user-details',
            'user-date-of-birth',
            'user-gender',
            'user-has-surgery',
            'user-surgery-type',
            'user-surgery-details',
            'user-surgery-specification',
            'user-surgery-date',
            'user-surgery-surgeon',
            'user-care-team',
            'user-confirm',
            'user-finish',
          ]
        default:
          return [null] // dummy step so step count is accurate (otherwise, will think 1st step is last step)
      }
    },

    currentStepIndex() {
      return this.steps.indexOf(this.currentStep)
    },

    ...mapState('organization', ['organization']),
    ...mapState('organization/newUser', ['organizationRoleType', 'surgery']),
  },
  mounted() {
    this.busOn('new-user:start', this.start)
  },
  methods: {
    handleCancel() {
      if (this.currentStepIndex +
        1 <
        this.steps.length &&
        !confirm('Are you sure you want to cancel? Your changes will not be saved.')) {
        return
      }
      this.$bvModal.hide('new-user')
    },

    start() {
      this.clearAll()
      this.currentStep = 'user-organization-role'
      this.$bvModal.show('new-user')
    },

    handleGoToStep(step) {
      this.currentStep = step
    },

    handleGoToNextStep() {
      this.currentStep = this.steps[this.currentStepIndex + 1]
    },

    handleGoToPreviousStep() {
      this.currentStep = this.steps[this.currentStepIndex - 1]
    },

    ...mapMutations('organization/newUser', {
      clearAll: 'CLEAR_ALL',
    }),
  },
}
</script>
