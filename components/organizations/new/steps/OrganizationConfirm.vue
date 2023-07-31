<template>
  <ex-step
    title="Confirm Details"
    step-title="Step 3 of 3"
    description="Please confirm all of the information below, and follow the next steps to complete organization onboarding."
    @back="$emit('back')"
    @submit="$emit('next')"
    @skip="$emit('skip')"
    next-step-text="View Organization"
    skip-step-text="Create Another Organization"
    has-skip-step
  >
    <b-row class="justify-content-center" v-if="organization.logo_file" >
      <b-col cols="auto">
        <ex-file v-bind="organization.logo_file" fluid/>
      </b-col>
    </b-row>
    <ex-empty-label v-else>No Logo</ex-empty-label>
    <ex-label>Organization Name</ex-label>
    <p>{{ organization.name }}</p>
    <ex-label>Description</ex-label>
    <p>{{ organization.description }}</p>
  </ex-step>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-step-organization-confirmation',
  computed: {
    ...mapState('organization/new', ['organization']),
  },
}
</script>
