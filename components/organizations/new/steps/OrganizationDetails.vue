<template>
  <ex-step
    title="New Organization"
    step-title="Step 1 of 3"
    description="Complete the required fields below."
    :has-previous-step="false"
    :has-next-step="false"
    :loading="loading"
    :error="error"
  >
    <ex-editable-organization-details
      hide-reset
      :submit-text="organization && organization.id ? 'Update Organization' : 'Create Organization'"
      @change="handleChange"
      :organization="organization"
      :loading="loading"
    />
  </ex-step>
</template>
<script>
import ExEditableOrganizationDetails from '../../editable/EditableOrganizationDetails'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ex-step-organization-details',
  components: { ExEditableOrganizationDetails },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('organization/new', ['error', 'organization']),
  },
  methods: {
    ...mapActions('organization/new', {
      createOrganization: 'CREATE_ORGANIZATION',
      updateOrganization: 'UPDATE_ORGANIZATION',
    }),
    async handleChange(organizationState) {
      this.loading = true
      const operation = organizationState.id ? this.updateOrganization : this.createOrganization
      await this.wait(operation, 750, {
        ...organizationState,
        slug: this.sluggify(organizationState.name),
      })
      if (!this.error && this.organization.id) this.$emit('next')
      this.loading = false
    }
  }
}
</script>
