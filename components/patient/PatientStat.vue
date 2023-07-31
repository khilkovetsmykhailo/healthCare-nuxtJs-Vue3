<template>
<span
  class="ex-patient-stat"
  :class="`level-${level}`"
>
  <span class="ex-patient-stat-level">
    {{ painText }}
    {{ complianceText }}
  </span>
  <span class="ex-patient-stat-description">
    <template v-if="pain !== undefined">avg pain</template>
    <template v-else-if="compliance !== undefined">compliance</template>
  </span>
</span>
</template>

<script>
export default {
  name: 'ex-patient-stat',
  props: {
    pain: {
      type: Number,
      default: undefined
    },
    compliance: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    level() {
      if (this.pain !== undefined) {
        if (!this.pain) return 'unknown'
        if (this.pain <= 5) return 'okay'
        return 'bad'
      }
      if (this.compliance !== undefined) {
        if (!this.compliance) return 'unknown'
        if (this.compliance >= 50) return 'okay'
        return 'bad'
      }
      return null
    },

    painText() {
      if (this.pain === undefined) return ''
      return this.pain ? Math.round(this.pain) : 'N/A'
    },

    complianceText() {
      if (this.compliance === undefined) return ''
      return this.compliance ? `${Math.round(this.compliance)}%` : '0%'
    },
  },
}
</script>
