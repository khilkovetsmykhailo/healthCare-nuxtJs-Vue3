<template>
  <ex-modal
    :id="id"
    :dismissible="!loading"
    title="Edit Organization Details"
    description="Edit organization name and description."
    @close="handleClose"
    size="md"
    :no-close-on-backdrop="loading"
  >
    <ex-editable-organization-details
      @change="handleChange"
      :organization="organization"
      :loading="loading"
    />
    <hr/>
    <b-row class="justify-content-center">
      <b-col cols="auto" class="my-3">
        <ex-editable-organization-logo
          :organization="organization"
          @change="handleChange"
        />
      </b-col>
    </b-row>
  </ex-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ExEditableOrganizationDetails from './EditableOrganizationDetails'
import ExEditableOrganizationLogo from './EditableOrganizationLogo'
export default {
  name: 'ex-editable-organization',
  components: { ExEditableOrganizationDetails, ExEditableOrganizationLogo },
  data: () => ({
    loading: false,
  }),
  props: {
    id: { type: String, default: 'editable-organization-modal' },
    organization: { type: Object, required: true },
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('organization', {
      fetchOrganization: 'FETCH_ORGANIZATION',
      updateOrganization: 'UPDATE_ORGANIZATION',
    }),
    handleClose() {
      this.$bvModal.hide(this.id)
    },
    setOrganizationState() {
      if (!this.organization) return
      const { name, description, id } = this.organization
      this.organizationState = { name, description, id }
    },
    start() {
      this.$bvModal.show(this.id)
    },
    async handleChange(organizationState) {
      if (organizationState) {
        this.loading = true
        await this.updateOrganization(organizationState)
        this.loading = false
      }
      this.$emit('change', organizationState)
    },
  }
}
</script>
