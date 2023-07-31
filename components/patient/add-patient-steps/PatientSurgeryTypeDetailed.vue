<template>
<ex-new-user-step
  title="Surgery type"
  description="Please choose patient surgery below"
  step-title="Step 6 of 8"
  :next-step-disabled="!applicableEventIsSelected"
  @submit="handleGoToStep('patient-surgeon')"
  @back="handleGoToStep('patient-surgery-type')"
>
  <div class="text-center">
    <b-button
      v-for="(eventType, index) in applicableEvents"
      :key="index"
      :variant="event_id === eventType.id ? 'primary' : 'outline-light'"
      @click="event_id = eventType.id"
      :class="{ 'mb-4': index < applicableEvents.length }"
    >
      {{ eventType.name }}
    </b-button>
  </div>
</ex-new-user-step>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-new-user-step-patient-surgery-type-detailed',
  data: () => ({
    event_id: null,
  }),
  computed: {
    ...mapState('patient/new', ['event', 'events']),
    applicableEvents() {
      return this.events.filter(({ type, type_secondary }) => {
        return type === this.event.type
          && type_secondary === this.event.type_secondary
      })
    },
    applicableEventIsSelected() {
      const matchingEvent = this.applicableEvents.find((event) => {
        return event.id === this.event_id
      })
      return matchingEvent
    },
  },
  mounted() {
    const { event_id } = this.event || {}
    this.event_id = event_id
  },
  methods: {
    handleGoToStep(step) {
      this.$emit('action', this.event_id)
      this.$emit('next', step)
    },
  },
}
</script>
