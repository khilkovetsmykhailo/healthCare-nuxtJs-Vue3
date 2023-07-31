<template>
  <ex-step
    title="Type of Activity"
    description="Please select an activity type below."
    :next-step-disabled="!activity.type"
    @submit="$emit('next')"
    @back="$emit('back')"
  >
    <ex-button-select
      :options="typeOptions"
      :selected="activity.type"
      @change="handleTypeChange"
    />
  </ex-step>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ex-step-activity-type',
  data: () => ({
    typeOptions: [
      { label: 'Physical', value: 'physical', icon: { name: 'running', fontAwesome: true } },
      { label: 'Wellness', value: 'wellness', icon: { name: 'spa', fontAwesome: true } },
      { label: 'Informational', value: 'informational', icon: { name: 'info-circle', fontAwesome: true } },
      { label: 'Stretching', value: 'stretching', icon: { name: 'child', fontAwesome: true } },
      { label: 'Survey', value: 'survey', icon: { name: 'clipboard-list', fontAwesome: true } },
    ],
  }),
  computed: {
    ...mapState('activities/activity', ['activity']),
  },
  methods: {
    ...mapActions('activities/activity', {
      updateActivityState: 'UPDATE_ACTIVITY_STATE',
    }),
    handleTypeChange(type) {
      this.updateActivityState({ type: type.value })
    },
  }
}
</script>
