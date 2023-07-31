<template>
  <ex-step
    title="Surgery Specification"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please choose surgery specification below."
    :next-step-disabled="surgery.specification === null"
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
      :options="specificationOptions"
      :selected="surgery.specification && surgery.specification.id"
      @change="handleSelectSpecification"
    />
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'ex-step-user-event-specification',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    availableSpecifications() {
      return this.surgeries.find(({ id }) => id === this.surgery.surgery.id).Specifications
    },

    specificationOptions() {
      return this.availableSpecifications.map((specification) => ({
        label: specification.name,
        value: specification.id,
      }))
    },

    ...mapState('organization/newUser', ['surgery']),
    ...mapState('static', ['surgeries']),
  },
  methods: {
    handleSelectSpecification(surgerySpecification) {
      this.setSurgeryField([
        'specification',
        this.availableSpecifications.find(({ id }) => id === surgerySpecification.value),
      ])
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
