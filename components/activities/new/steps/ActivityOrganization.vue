<template>
  <ex-step
    title="Select Organization"
    description="Please select an organization below."
    :next-step-disabled="!activity.organization_id"
    :has-previous-step="false"
    @back="$emit('back')"
    @submit="$emit('next')"
  >
    <ex-button-select
      :options="organizationOptions"
      :selected="activity.organization_id"
      @change="handleOrganizationChange"
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
    ...mapState('organizations', ['organizations']),
    organizationOptions() {
      return this.organizations.map((organization) => ({
        ...organization,
        label: organization.name,
        value: organization.id,
        id: organization.id,
      }))
    }
  },
  mounted() {
    this.getOrganizations()
  },
  methods: {
    ...mapActions('organizations', {
      clearOrganizations: 'CLEAR_ORGANIZATIONS',
      fetchOrganizations: 'FETCH_ORGANIZATIONS',
    }),
    ...mapActions('activities/activity', {
      updateActivityState: 'UPDATE_ACTIVITY_STATE',
    }),
    handleOrganizationChange(organization) {
      this.updateActivityState({ organization_id: organization.id })
    },
    async getOrganizations() {
      this.loading = true
      await this.wait(this.fetchOrganizations, 750)
      this.loading = false
    }
  }
}
</script>
