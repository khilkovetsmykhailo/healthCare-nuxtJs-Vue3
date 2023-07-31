<template>
  <ex-step
    title="Surgery"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please indicate if the patient has a surgery below."
    :next-step-disabled="hasSurgery === null"
    @submit="handleGoToStep"
    @back="$emit('back')"
  >
    <b-alert
      variant="warning"
      show
      class="mb-5"
    >
      Please note: If you need to change the surgery details later, the user will need to be deleted and created
      again. Ability to edit surgery details coming soon.
    </b-alert>

    <h3 class="text-center mb-5">Does the patient have an upcoming surgery?</h3>

    <ex-button-select
      :options="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
      :selected="hasSurgery"
      @change="setHasSurgery($event.value)"
    />
  </ex-step>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'ex-step-user-event-details',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['hasSurgery']),
  },
  methods: {
    handleGoToStep() {
      if (this.hasSurgery === true) {
        this.$emit('next')
      } else {
        this.$emit('go-to-step', 'user-care-team')
      }
    },

    ...mapMutations('organization/newUser', {
      setHasSurgery: 'SET_HAS_SURGERY',
    }),
  },
}
</script>
