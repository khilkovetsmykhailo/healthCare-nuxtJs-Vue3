<template>
  <div>
    <transition name="fade" mode="out-in">
      <b-button
        v-if="!organization.logo_file"
        variant="outline-primary"
        @click="handleUploadImage()"
      >
        Upload Image
      </b-button>
      <ex-file-card
        v-else
        :file="file"
        :loading="loading"
        :deleting="loading"
        @delete="handleDelete"
        @upload="handleUploadImage(organization.logo_file)"
      />
    </transition>
    <ex-file-modal
      id="new-organization-files-modal"
      title="Upload Logo"
      description="Complete the fields below to create or replace an existing logo."
      :accept="['png', 'jpg', 'jpeg', 'gif'].map(type => `image/${type}`).toString()"
      @uploaded="handleUploaded"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ex-editable-organization-logo',
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('global/file', ['file']),
  },
  props: {
    error: { type: String },
    organization: { type: Object, required: true }
  },
  mounted() {
    if (this.organization && this.organization.logo_file) {
      this.setFile(this.organization.logo_file)
    }
  },
  methods: {
    ...mapActions('organization/new', { fetchOrganization: 'FETCH_ORGANIZATION' }),
    ...mapActions('global/file', {
      deleteFile: 'DELETE_FILE',
      setFile: 'SET_FILE',
    }),
    handleUploadImage(fileState) {
      this.busEmit('new-organization-files-modal:start', fileState || {
        owner_type: 'organizations',
        owner_id: this.organization.id,
        description: 'logo',
      })
    },
    async handleUploaded() {
      this.$emit('change', this.file)
    },
    async handleDelete() {
      this.loading = true
      await this.wait(this.deleteFile, 750, this.organization.logo_file.id)
      this.handleUploaded()
      this.loading = false
    }
  }
}
</script>
