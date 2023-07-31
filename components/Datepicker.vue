<template>
  <datepicker
    class="ex-datepicker"
    inline
    :value="value"
    @input="handleChange"
    :disabled-dates="computedDisabledDates"
  />
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'ex-datepicker',
  components: { Datepicker },
  props: {
    disabledDates: {
      type: Object,
      default: undefined,
    },
    value: {
      type: [String, Date],
      default: undefined,
    },
    past: {
      type: Boolean,
    },
    future: {
      type: Boolean,
    },
  },
  computed: {
    computedDisabledDates() {
      if (this.disabledDates) return this.disabledDates;
      if (this.past) return { from: new Date() }
      if (this.future) return { to: new Date() }
      return {}
    },
  },
  methods: {
    /**
     * Handles changing of datepicker input.
     *
     * @param {Date} value
     */
    handleChange(value) {
      this.$emit('input', value)
    },
  },
}
</script>
