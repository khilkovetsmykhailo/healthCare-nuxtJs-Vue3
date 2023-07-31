<template>
  <component :is="tag" class="mb-0 text-muted">
    <b-row class="align-items-center" no-gutters>
      <b-col cols="auto">
        <font-awesome-icon :icon="icon" class="text-warning mr-1"/>
        <span class="text-capitalize">{{ activity.type }} Activity</span>
        <template v-if="duration && activity.duration">
          <span class="mx-1">&bull;</span>
          <span class="text-primary font-weight-bold mr-1">
            {{ activity.type === 'informational' ? Math.ceil(activity.duration/60) : activity.duration }}
          </span>
          {{ activity.duration_text || 'Seconds / Rep' }}
        </template>
      </b-col>
      <b-col v-if="$slots.default" cols="auto">
        <slot/>
      </b-col>
    </b-row>
  </component>
</template>
<script>
export default {
  name: 'ex-activity-descriptor',
  props: {
    activity: { type: Object, required: true },
    tag: { type: String, default: 'p' },
    duration: { type: Boolean }
  },
  computed: {
    icon() {
      const icons = {
        walking: 'walking',
        informational: 'info-circle',
        survey: 'clipboard-list',
        breathing: 'spa',
        wellness: 'spa',
        physical: 'running',
        stretching: 'child',
      }
      return icons[this.activity.type]
    },
  }
}
</script>
