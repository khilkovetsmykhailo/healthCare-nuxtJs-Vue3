<template>
  <ex-step
    title="Type of Surgery"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please choose patient surgery type below."
    :next-step-disabled="surgery.type === null"
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
      v-if="surgeryTypes !== null"
      :options="surgeryTypeOptions"
      :selected="surgery.type && surgery.type.id"
      @change="handleSelectSurgeryType"
    />

    <b-alert v-if="surgeryTypes === null">
      Something went wrong getting available surgery types. Please try again later.
    </b-alert>
  </ex-step>
</template>
<script>
import {mapMutations, mapGetters, mapState} from 'vuex'

export default {
  name: 'ex-step-user-event-type',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    surgeryTypeOptions() {
      return this.surgeryTypes.map((surgeryType) => ({
        label: surgeryType.name,
        value: surgeryType.id,
      }))
    },

    ...mapState('organization/newUser', ['surgery']),
    ...mapGetters('static', ['surgeryTypes']),
  },
  methods: {
    handleSelectSurgeryType(surgeryType) {
      this.setSurgeryField(['type', this.surgeryTypes.find(({ id }) => id === surgeryType.value)])
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
