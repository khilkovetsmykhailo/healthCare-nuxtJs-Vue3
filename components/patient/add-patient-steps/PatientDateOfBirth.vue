<template>
<ex-new-user-step
  title="Patient date of birth"
  description="Please enter patient date of birth below"
  step-title="Step 2 of 8"
  :next-step-disabled="!date_of_birth"
  @submit="handleGoToStep('patient-gender')"
  @back="handleGoToStep('patient-name', true)"
>
  <b-row class="justify-content-center">
    <b-col class="col-12 col-lg-10">
      <ex-datepicker v-model="date_of_birth"/>
    </b-col>
  </b-row>
  <p class="text-center text-muted mt-3">
    {{ date_of_birth ? `${$moment().diff(date_of_birth, 'years')} ` : '' }}Years Young
  </p>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-name',
  data: () => ({
    date_of_birth: null,
  }),
  computed: {
    ...mapState('patient/new', ['user'])
  },
  mounted() {
    const { date_of_birth } = this.user || {}
    this.date_of_birth = date_of_birth
  },
  methods: {
    /**
     * Checks that the input was a number.
     *
     * @param {*} event Keypress event.
     */
    checkForNumber(event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },

    /**
     * Handles going to the next step
     */
    handleGoToStep(step) {
      this.$emit('action', this.date_of_birth)
      this.$emit('next', step)
    },
  },
}
</script>
