<template>
  <ex-step
    title="Congratulations!"
    description="Thank you for onboarding a new user to the Demo Health platform! They will immediately receive an email with additional onboarding instructions."
    next-step-text="Finish"
    :step-title="`Step ${step} of ${totalSteps}`"
    :has-previous-step="false"
    @submit="goToUserPage"
  >
    <b-row class="justify-content-center">
      <b-col class="col-12 col-md-10 col-lg-9 col-xl-8">
        <img src="/images/overview.svg" class="w-100"/>
      </b-col>
    </b-row>
  </ex-step>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ex-step-user-finish',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['createdUser']),
    ...mapState('organization', ['organization']),
  },
  methods: {
    goToUserPage() {
      this.$bvModal.hide('new-user')

      if (this.createdUser.patientId) {
        // User is patient
        this.$router.push(`/${this.organization.slug}/patients/${this.createdUser.patientId}`)
      } else {
        // User is clinical user
        this.$router.push(`/${this.organization.slug}`)
      }
    },
  },
}
</script>
