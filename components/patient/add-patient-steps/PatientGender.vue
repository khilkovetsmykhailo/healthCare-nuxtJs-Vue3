<template>
<ex-new-user-step
  title="Patient gender"
  description="Please choose patient gender below"
  step-title="Step 3 of 8"
  :next-step-disabled="!gender"
  @submit="handleGoToStep('patient-height-weight')"
  @back="handleGoToStep('patient-date-of-birth')"
>
  <div class="text-center">
    <b-button
      :variant="gender === 'male' ? 'primary' : 'outline-light'"
      @click="gender = 'male'"
      class="mb-4"
    >
      Male
    </b-button>
    <b-button
      :variant="gender === 'female' ? 'primary' : 'outline-light'"
      @click="gender = 'female'"
      class="mb-4"
    >
      Female
    </b-button>
    <b-button
      :variant="gender === 'other' ? 'primary' : 'outline-light'"
      @click="gender = 'other'"
    >
      Other
    </b-button>
  </div>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-gender',
  data: () => ({
    gender: null,
  }),
  computed: {
    ...mapState('patient/new', ['user']),
  },
  mounted() {
    const { gender } = this.user || {}
    this.gender = gender
  },
  methods: {
    /**
     * Handles going to the next step
     */
    handleGoToStep(step) {
      this.$emit('action', this.gender)
      this.$emit('next', step)
    },
  },
}
</script>
