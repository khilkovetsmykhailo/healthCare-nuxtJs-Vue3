<template>
<ex-new-user-step
  title="SurgeryType"
  description="Please choose patient surgery below"
  step-title="Step 5 of 8"
  :next-step-disabled="!type_secondary"
  @submit="handleGoToStep('patient-surgery-type-detailed')"
  @back="handleGoToStep('patient-height-weight')"
  @skip="handleGoToStep('patient-confirm')"
  has-skip-step
>
  <div v-if="loading">
    <ex-loading/>
  </div>
  <transition name="fade">
    <div class="text-center" v-if="!loading && eventTypes && eventTypes.length > 0">
      <b-button
        v-for="(eventType, index) in eventTypes"
        :key="index"
        :variant="type_secondary === eventType.type_secondary ? 'primary' : 'outline-light'"
        @click="handleEventTypeSelection(eventType)"
        class="mb-4 ex-add-patent-step-surgery-type-button"
      >
        {{ eventType.type_secondary }} {{ eventType.type }}
        <ex-icon
          :icon="`${eventType.type}-${eventType.type_secondary}`"
          inline
        />
      </b-button>
    </div>
  </transition>
</ex-new-user-step>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import ExLoading from '~/components/Loading'
import { delay } from '~/lib/utils'
export default {
  name: 'ex-new-user-step-patient-surgery-type',
  data: () => ({
    loading: true,
    type: null,
    type_secondary: null,
  }),
  components: { ExLoading },
  computed: {
    ...mapState('patient/new', ['event']),
    ...mapGetters('patient/new', ['eventTypes']),
  },
  async mounted() {
    const { type, type_secondary } = this.event || {}
    this.type = type
    this.type_secondary = type_secondary

    await this.clearEvents()
    await delay(this.fetchEvents, 750)
    this.loading = false
  },
  methods: {
    ...mapActions('patient/new', {
      clearEvents: 'CLEAR_EVENTS',
      fetchEvents: 'FETCH_EVENTS',
    }),
    handleGoToStep(step) {
      this.$emit('action', {
        type: this.type,
        type_secondary: this.type_secondary,
      })
      this.$emit('next', step)
    },
    handleEventTypeSelection({ type, type_secondary }) {
      this.type = type
      this.type_secondary = type_secondary
    }
  },
}
</script>
