<template>
<div class="ex-activity-search">
  <ex-search
    :placeholder="placeholder"
    :disabled="disabled"
    @search="handleSearch"
  />
  <ex-list-item
    v-for="activity in activities"
    :key="activity.id"
    tag="button"
    :disabled="disabled"
    @click.native="$emit('select', activity)"
  >
    <ex-activity-list-item
      :activity="activity"
      :show-duration="false"
      :show-image="!showImage"
      flat
    />
  </ex-list-item>
  <b-alert
    v-if="error"
    variant="danger"
    show
  >
    {{ error }}
  </b-alert>
  <ex-loading v-if="loading"/>
  <div
    v-if="!loading && (!activities || !activities.length) && hasSearched"
    class="no-activities"
  >
    <slot/>
    <template v-if="!$slots.default">No activities found</template>
  </div>
</div>
</template>

<script>
import ExActivityListItem from './recoveryPlan/ActivityListItem'

export default {
  name: 'ex-activity-search',
  components: {ExActivityListItem},
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Search for an activity by name',
    },
    noResults: {
      type: Boolean,
      default: false,
    },
    showImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasSearched: false,
    }
  },
  methods: {
    handleSearch(query) {
      this.$emit('search', query)
      this.hasSearched = true
    },
  },
}
</script>
