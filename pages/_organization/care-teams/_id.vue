<template>
  <div>
    <ex-loading v-if="loading"/>
    <template v-if="!loading">
      <b-card class="shadow-sm">
        <ex-team
          :team="careTeam"
          :has-delete="currentUserIsSystemAdministrator"
        />
      </b-card>
      <ex-delete-care-team :care-team="careTeam"/>
      <ex-edit-care-team :care-team="careTeam"/>
      <ex-add-team-member :careTeam="careTeam"/>
    </template>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import ExDeleteCareTeam from '~/components/teams/DeleteCareTeam'
import ExEditCareTeam from '~/components/teams/EditCareTeam'
import ExAddTeamMember from '~/components/teams/AddTeamMember'
import ExTeam from '~/components/teams/Team'

export default {
  layout: 'organization',
  components: {
    ExDeleteCareTeam,
    ExEditCareTeam,
    ExAddTeamMember,
    ExTeam,
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState('organization/careTeam', ['careTeam']),
  },
  async mounted() {
    await this.$store.dispatch('organization/careTeam/GET_CARE_TEAM', parseInt(this.$route.params.id, 10))
    if (this.$store.state.organization.careTeam.careTeam === null) {
      // Could not find care team. Redirect user
      console.error(`404 - Care Team not found for ID: ${this.$route.params.id}.`)
      this.$router.push('/error')
    }
    this.loading = false
  },
}
</script>
