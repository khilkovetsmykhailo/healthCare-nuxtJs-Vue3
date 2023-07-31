<template>
  <ex-step
    title="Surgery Details"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please choose patient surgery below."
    :next-step-disabled="surgery.surgery === null"
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

    <ex-button-select
      v-if="surgeries !== null"
      :options="surgeryOptions"
      :selected="surgery.surgery && surgery.surgery.id"
      @change="handleSelectSurgery"
    />

    <b-alert v-if="surgeries === null">
      Something went wrong getting available surgeries. Please try again later.
    </b-alert>
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'ex-step-user-event-type',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    surgeryOptions() {
      return this.surgeries.filter((surgery) => surgery.Type.id === this.surgery.type.id).map((surgery) => ({
        label: surgery.name,
        value: surgery.id,
      }))
    },

    ...mapState('organization/newUser', ['surgery']),
    ...mapState('static', ['surgeries']),
  },
  methods: {
    handleSelectSurgery(surgery) {
      this.setSurgeryField(['surgery', this.surgeries.find(({ id }) => id === surgery.value)])
    },

    handleGoToStep() {
      this.$emit('next')
    },

    ...mapMutations('organization/newUser', {
      setSurgeryField: 'SET_SURGERY_FIELD',
    }),
  },
}
</script>
