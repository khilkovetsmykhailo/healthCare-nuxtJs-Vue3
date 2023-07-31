<template>
  <ex-step
    title="Surgery Date"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please choose the date of the patient’s surgery"
    :disabled="surgery.date === null"
    @submit="handleGoToStep"
    @back="$emit('back')"
  >
    <b-row class="justify-content-center">
      <b-col
        cols="12"
        lg="10"
      >
        <b-alert
          variant="warning"
          show
          class="mb-5"
        >
          Please note: If you need to change the surgery details later, the user will need to be deleted and created
          again. Ability to edit surgery details coming soon.
        </b-alert>

        <ex-datepicker
          :value="surgery.date"
          @input="setSurgeryField(['date', $event])"
        />
      </b-col>
    </b-row>
  </ex-step>
</template>
<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'ex-step-user-event-date',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['surgery']),
  },
  methods: {
    handleGoToStep() {
      this.$emit('next')
    },
    ...mapMutations('organization/newUser', {
      setSurgeryField: 'SET_SURGERY_FIELD',
    })
  },
}
</script>
