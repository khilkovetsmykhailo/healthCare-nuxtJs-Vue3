<template>
  <ex-step
    title="Organization Logo"
    step-title="Step 2 of 3"
    description="Upload a logo for your organization below."
    @back="$emit('back')"
    :has-skip-step="!organization.logo_file"
    :next-step-disabled="!organization.logo_file"
    @skip="$emit('next')"
    @submit="$emit('next')"
  >
    <ex-editable-organization-logo
      :error="error"
      :organization="organization"
      @change="handleUploaded"
    />
  </ex-step>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ExEditableOrganizationLogo from '../../editable/EditableOrganizationLogo'
export default {
  name: 'ex-step-organization-logo',
  data: () => ({
    loading: false,
  }),
  components: {
    ExEditableOrganizationLogo,
  },
  computed: {
    ...mapState('organization/new', ['organization', 'error']),
    ...mapState('global/file', ['file']),
  },
  methods: {
    ...mapActions('organization/new', { fetchOrganization: 'FETCH_ORGANIZATION' }),
    ...mapActions('global/file', { deleteFile: 'DELETE_FILE' }),
    handleUploadImage(fileState) {
      this.busEmit('new-organization-files-modal:start', fileState || {
        owner_type: 'organizations',
        owner_id: this.organization.id,
        description: 'logo',
      })
    },
    async handleUploaded() {
      this.loading = true
      await this.fetchOrganization(this.organization.id)
      this.loading = false
    },
    async handleDelete() {
      this.loading = true
      await this.wait(this.deleteFile, 750, this.organization.logo_file.id)
      this.handleUploaded()
    },
  }
}
</script>
