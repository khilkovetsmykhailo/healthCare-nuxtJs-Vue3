<template>
  <ex-activity-search
    :activities="activities"
    :loading="loading"
    :error="error"
    :disabled="disabled"
    @select="$emit('select', $event)"
    @search="handleSearchActivities"
  />
</template>

<script>
import makeRequest from '../util/graphql/makeRequest'
import extractNodes from '../util/graphql/extractNodes'
import queryActivities from '../graphql/queries/activity/activities'

export default {
  name: 'ex-activity-search-integrated',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      activities: null,
      error: null,
    }
  },
  methods: {
    async handleSearchActivities(search) {
      this.loading = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryActivities,
        variables: {
          search: search,
        },
      })

      if (errors.length) {
        this.error = 'Could not get activities.'
      } else {
        this.activities = extractNodes(data.activities)
      }

      this.loading = false
    },
  },
}
</script>
