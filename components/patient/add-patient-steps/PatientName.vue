<template>
<ex-new-user-step
  title="Patient name"
  description="Please enter patient first and last name"
  step-title="Step 1 of 8"
  :next-step-disabled="!firstName || !lastName || !email"
  @submit="handleGoToStep('patient-date-of-birth')"
  :has-previous-step="false"
>
  <b-form>
    <b-form-input
      v-model="firstName"
      placeholder="Type first name here"
      class="large"
      required
    />
    <b-form-input
      v-model="lastName"
      placeholder="Type last name here"
      class="large my-4"
      required
    />
    <b-form-input
      v-model="email"
      placeholder="Type email address here"
      class="large"

    />
  </b-form>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-name',
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
  }),
  computed: {
    ...mapState('patient/new', ['user']),
  },
  mounted() {
    const { firstName, lastName, email } = this.user || {}
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  },
  methods: {
    handleGoToStep(step) {
      this.$emit('action', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      })
      this.$emit('next', step)
    },
  },
}
</script>
