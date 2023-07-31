<template>
  <ex-step
    title="Congratulations!"
    description="Thank you for creating a new care team on the Demo Health platform!"
    next-step-text="View Care Team"
    :has-previous-step="false"
    @submit="goToTeamPage"
  >
    <b-row class="justify-content-center">
      <b-col class="col-12 col-md-10 col-lg-9 col-xl-8">
        <img src="/images/overview.svg" class="w-100"/>
        <hr/>
        <h3>{{ careTeam.name }}</h3>
        <p>{{ careTeam.description }}</p>
        <hr/>
        <p class="mb-0">
          View this new care team to add patients and clinical users.
        </p>
      </b-col>
    </b-row>
  </ex-step>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'ex-step-team-finish',
  props: {
    careTeam: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('organization', ['organization']),
  },
  methods: {
    goToTeamPage() {
      this.$bvModal.hide('new-care-team')
      this.$router.push(`/${this.organization.slug}/care-teams/${this.careTeam.id}`)
    },
  },
}
</script>
