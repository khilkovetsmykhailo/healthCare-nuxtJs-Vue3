<template>
  <div class="ex-team">
    <header class="ex-team-header my-0">
      <b-row class="justify-content-between align-items-center my-0 py-0">
        <b-col cols="auto">
          <h1 class="h3 font-weight-normal mb-0">{{ careTeam.name }}</h1>
        </b-col>
        <b-col cols="auto">
          <ex-icon-button
            v-if="highestRoleIndex >= 4"
            icon="pencil-alt"
            tag="a"
            size="sm"
            class="text-primary mr-2"
            color="primary"
            tooltip="Edit Team"
            @click="handleEditTeam"
            font-awesome
          />
<!--          <ex-icon-button-->
<!--            v-if="hasDelete"-->
<!--            icon="trash-alt"-->
<!--            tag="a"-->
<!--            size="sm"-->
<!--            class="text-danger mr-2"-->
<!--            color="red"-->
<!--            tooltip="Delete Team"-->
<!--            @click="handleDeleteTeam"-->
<!--            font-awesome-->
<!--          />-->
          <ex-icon-button
            icon="times"
            tag="a"
            size="sm"
            color="primary"
            tooltip="Close Team"
            @click="handleClose"
            font-awesome
          />
        </b-col>
      </b-row>
    </header>

    <section class="ex-patient-tabs mt-5">
      <ex-team-members-list
        :members="members"
        :loading="loading"
      >
        Care Team Members
      </ex-team-members-list>
    </section>
  </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import ExTeamMembersList from '~/components/teams/TeamMembersList'

export default {
  name: 'ex-team',
  components: {
    ExTeamMembersList,
  },
  props: {
    loading: { type: Boolean },
    hasDelete: { type: Boolean },
  },
  computed: {
    ...mapState('organization/careTeam', ['careTeam']),
    ...mapState('organization', ['organization']),
    ...mapGetters('organization/careTeam', ['members']),
    ...mapGetters('currentUser', ['highestRoleIndex']),
  },
  methods: {
    handleClose() {
      this.$router.push(`/${this.unsluggify(this.organization.slug)}`)
    },

    handleDeleteTeam() {
      this.busEmit('delete-care-team:start')
    },

    handleEditTeam() {
      this.busEmit('edit-care-team:start')
    },
  },
}
</script>
