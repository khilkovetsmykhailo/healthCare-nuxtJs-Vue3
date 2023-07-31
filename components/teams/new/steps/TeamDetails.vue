<template>
  <ex-step
    title="New Team Details"
    :step-title="`Step ${step} of ${stepTotal}`"
    description="Please enter the name and a brief description of the team below."
    :next-step-disabled="!careTeamState.name || !careTeamState.description"
    :has-previous-step="false"
    next-step-text="Create Care Team"
    @submit="$emit('next')"
  >
    <b-form-input
      placeholder="Type team name here"
      class="large"
      required
      autofocus
      :value="name"
      @change="name = $event"
    />
    <b-form-textarea
      placeholder="Type team description here"
      class="large my-4"
      rows="3"
      max-rows="6"
      size="lg"
      required
      :value="description"
      @change="description = $event"
    />
  </ex-step>
</template>
<script>
export default {
  name: 'ex-step-team-details',
  model: {
    prop: 'careTeamState',
    event: 'change',
  },
  props: {
    careTeamState: {
      type: Object,
      required: true,
    },
    step: { type: [String, Number], required: true },
    stepTotal: { type: [String, Number], required: true },
  },
  data() {
    return {
      name: this.careTeamState.name || null,
      description: this.careTeamState.description || null,
    }
  },
  watch: {
    name() {
      this.$emit('change', {
        ...this.careTeamState,
        name: this.name,
      })
    },

    description() {
      this.$emit('change', {
        ...this.careTeamState,
        description: this.description,
      })
    },
  },
}
</script>
