<template>
<ex-new-user-step
  title="Patient weight & height"
  description="Please enter patient height and weight below"
  step-title="Step 4 of 8"
  :next-step-disabled="!height || !weight"
  @submit="handleGoToStep('patient-has-surgery')"
  @back="handleGoToStep('patient-gender', true)"
>
  <b-alert
    :show="!!error"
    variant="danger"
  >
    {{ error }}
  </b-alert>
  <label for="patient-weight-input">Weight ({{ weightUnit }})</label>
  <div class="form-input-unit-container mb-4">
    <b-form-input
      v-model="weight"
      id="patient-weight-input"
      name="patient-weight"
      placeholder="Type patient weight here"
      class="large"
      @keypress="checkForNumber"
    />
    <b-button-group class="unit">
      <b-button
        :variant="weightUnit === 'lb' ? 'primary' : 'outline-light'"
        @click="weightUnit = 'lb'"
      >
        lb
      </b-button>
      <b-button
        :variant="weightUnit === 'kg' ? 'primary' : 'outline-light'"
        @click="weightUnit = 'kg'"
      >
        kg
      </b-button>
    </b-button-group>
  </div>

  <label for="patient-height-input">Height ({{ heightUnit }})</label>
  <div class="form-input-unit-container">
    <b-form-input
      v-model="height"
      id="patient-height-input"
      name="patient-height"
      placeholder="Type patient height here"
      class="large"
      @keypress="checkForNumber"
    />
    <b-button-group class="unit">
      <b-button
        :variant="heightUnit === 'in' ? 'primary' : 'outline-light'"
        @click="heightUnit = 'in'"
      >
        in
      </b-button>
      <b-button
        :variant="heightUnit === 'cm' ? 'primary' : 'outline-light'"
        @click="heightUnit = 'cm'"
      >
        cm
      </b-button>
    </b-button-group>
  </div>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-height-weight',
  data: () => ({
    height: null,
    weight: null,
    weightUnit: 'lb',
    heightUnit: 'in',
    error: null,
  }),
  computed: {
    ...mapState('patient/new', ['profile']),
  },
  mounted() {
    const { height, weight } = this.profile
    this.height = height || null
    this.weight = weight || null
  },
  methods: {
    /**
     * Checks that the input was a number.
     *
     * @param {*} event Keypress event.
     */
    checkForNumber(event) {
      const charCode = (event.which) ? event.which : event.keyCode
      if (charCode < 48 || charCode > 57) {
        event.preventDefault()
      }
    },

    /**
     * Handles going to the next step
     */
    handleGoToStep(step, skipValidation) {
      // Only numbers allowed, ya heard?
      if (!skipValidation && (!/^\d+$/.test(this.height) || !/^\d+$/.test(this.weight))) {
        this.error = 'Height/Weight can only contain numbers'
        return
      }

      this.$emit('action', {
        weight: this.weightUnit === 'kb'
          ? Math.round(parseInt(this.weight) * 0.45359237)
          : parseInt(this.weight),
        height: this.heightUnit === 'cm'
          ? Math.round(parseInt(this.height) * 2.54)
          : parseInt(this.height),
      })
      this.$emit('next', step)
    },
  },
}
</script>
