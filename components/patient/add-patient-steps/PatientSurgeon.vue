<template>
<ex-new-user-step
  title="Surgeon name"
  description="Please enter the surgeon for this patient"
  step-title="Step 7 of 8"
  :next-step-disabled="!applicableUserIsSelected"
  @submit="handleGoToStep('patient-surgery-date')"
  @back="handleGoToStep('patient-surgery-type-detailed')"
  @skip="handleGoToStep('patient-surgery-date')"
  has-skip-step
>
  <ex-search @change="searchClinicalUsers" v-model="search" placeholder="Search by Name"/>
  <ex-loading v-if="loading"/>
  <transition name="fade">
    <div v-if="!loading && clinicalUsers && clinicalUsers.length > 0">
      <ex-user-list-item
        v-for="(userOrgRole, index) in clinicalUsers"
        :key="index"
        v-bind="userOrgRole.user"
        :subtitle="userOrgRole.organization_role.role.name"
        :active="user_organization_role_id === userOrgRole.id"
        @click.native="toggleSelected(userOrgRole.id)"
      />
    </div>
  </transition>
  <p
    v-if="!loading && clinicalUsers && clinicalUsers.length <= 0"
    class="small text-center text-muted py-4 border"
  >
    No Results
  </p>

</ex-new-user-step>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { delay } from '~/lib/utils'
import ExSearch from '~/components/Search'
import ExUserListItem from '~/components/UserListItem'
export default {
  name: 'ex-new-user-step-patient-surgeon',
  components: { ExSearch, ExUserListItem },
  data: () => ({
    loading: true,
    search: null,
    user_organization_role_id: null,
  }),
  computed: {
    ...mapState('patient/new', ['event', 'clinicalUsers']),
    ...mapState('organization', ['organization']),
    ...mapGetters('organization', ['clinicalOrganizationRoles']),
    applicableUserIsSelected() {
      if (!this.user_organization_role_id || this.loading) return false
      const displayedUserIds = this.clinicalUsers.map(({ id }) => id)
      return displayedUserIds.includes(this.user_organization_role_id)
    },
  },
  async mounted() {
    const { user_organization_role_id } = this.event
    this.user_organization_role_id = user_organization_role_id
    this.searchClinicalUsers()
  },
  methods: {
    ...mapActions('patient/new', {
      fetchClinicalUsers: 'FETCH_CLINICAL_USERS',
    }),
    handleGoToStep(step) {
      this.$emit('action', this.user_organization_role_id)
      this.$emit('next', step)
    },
    async searchClinicalUsers(search) {
      this.loading = true
      await delay(this.fetchClinicalUsers, 750, {
        search,
        organizationId: this.organization.id,
        roles: this.clinicalOrganizationRoles.map(({ id }) => id).toString(),
      })
      this.loading = false
    },
    toggleSelected(user_organization_role_id) {
      this.user_organization_role_id = this.user_organization_role_id === user_organization_role_id
        ? null
        : user_organization_role_id
    },
  },
}
</script>
