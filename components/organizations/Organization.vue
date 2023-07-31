<template>
  <div class="ex-patient">
    <header class="ex-organization-header my-0">
      <b-row class="justify-content-between align-items-center my-0 py-0">
        <b-col cols="auto">
          <h1 class="h3 font-weight-normal mb-0">{{ name }}</h1>
        </b-col>
        <b-col cols="auto" v-if="currentUserIsSystemAdministrator">
          <ex-icon-button
            icon="pencil-alt"
            tag="a"
            size="sm"
            class="text-primary mx-3"
            color="primary"
            tooltip="Edit Organization Details"
            @click="handleEditOrganization"
            font-awesome
          />
          <ex-icon-button
            v-if="currentUserIsSystemAdministrator"
            icon="trash-alt"
            tag="a"
            size="sm"
            class="text-danger"
            color="red"
            tooltip="Delete Organization"
            @click="busEmit('delete-organization:start', organization)"
            font-awesome
          />
        </b-col>
      </b-row>
    </header>
    <ex-editable-organization v-bind="{ error, organization, loading }"/>
    <ex-delete-organization
      id="delete-organization"
      @delete="handleDelete"
      :deleting="deleting"
      :error="error"
    />
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ExEditableOrganization from '~/components/organizations/editable/EditableOrganization'
import ExDeleteOrganization from '~/components/organizations/delete/DeleteOrganization'
export default {
  name: 'ex-organization',
  components: { ExEditableOrganization, ExDeleteOrganization },
  data: () => ({
    deleting: false,
  }),
  props: {
    loading: { type: Boolean },
    id: { type: [String, Number] },
    name: { type: String },
    description: { type: String },
    hasDelete: { type: Boolean },
  },
  computed: {
    ...mapState('organization', ['error', 'organization']),
    ...mapGetters('auth', { authOrganizations: 'organizations' }),
  },
  methods: {
    ...mapActions('organization', {
      deleteOrganization: 'DELETE_ORGANIZATION',
    }),
    handleEditOrganization() {
      this.busEmit('editable-organization-modal:start')
    },
    handleDeleteOrganization() {
      const confirmation = confirm(`Are you sure you'd like to delete the ${this.organization.name} organization?`)
      if (!confirmation) return
      this.loading
    },
    isAdmin() {
      if (!this.organization || !this.authOrganizations) return false
      const authOrg = this.authOrganizations.find(({ id }) => id === this.organization.id)
      return authOrg ? authOrg.ADMIN || authOrg.SYS_ADMIN : false
    },
    tryDelete() {
      this.busEmit('delete-organization:start', this.organization)
    },
    async handleDelete() {
      this.deleting = true
      await this.wait(this.deleteOrganization, 1000, this.organization.id)
      if (this.error) { this.deleting = false }
      else {
        this.busEmit('delete-organization:stop')
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
