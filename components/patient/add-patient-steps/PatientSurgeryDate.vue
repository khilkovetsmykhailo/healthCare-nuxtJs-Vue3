<template>
<ex-new-user-step
  title="Surgery date"
  description="Please choose the date of the patient’s surgery"
  step-title="Step 8 of 8"
  next-step-text="Next Step"
  :next-step-disabled="!date"
  @submit="handleGoToStep('patient-confirm')"
  @back="handleGoToStep('patient-surgeon')"
>
  <b-row class="justify-content-center">
    <b-col
      cols="12"
      lg="10"
    >
      <ex-datepicker v-model="date"/>
    </b-col>
  </b-row>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-surgery-date',
  data: () => ({
    date: null,
  }),
  computed: {
    ...mapState('patient/new', ['event']),
  },
  mounted() {
    const { date } = this.event
    this.date = date
  },
  methods: {
    handleGoToStep(step) {
      this.$emit('action', this.date)
      this.$emit('next', step)
    },
  },
}
</script>
