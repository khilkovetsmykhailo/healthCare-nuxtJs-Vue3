<template>
  <ex-step
    title="Care Team"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please enter the care team for this patient"
    @submit="handleGoToStep"
    @skip="handleGoToStep"
    @back="$emit('back')"
    :next-step-disabled="careTeam === null"
    :skip-step-disabled="careTeam !== null"
    has-skip-step
  >
    <ex-search
      v-model="search"
      placeholder="Search Care Teams by Name"
      @change="handleCareTeamSearch"
    />
    <ex-loading v-if="loading"/>
    <transition name="fade">
      <div v-if="!loading && availableCareTeams !== null">
        <ex-team-list-item
          v-for="availableCareTeam in availableCareTeams"
          :key="`care-team-${availableCareTeam.id}`"
          :care-team="availableCareTeam"
          :active="availableCareTeam.id === (careTeam && careTeam.id)"
          tag="button"
          @click.native="handleSelectCareTeam(availableCareTeam)"
        />
      </div>
    </transition>
    <p
      v-if="!loading && availableCareTeams !== null && !availableCareTeams.length"
      class="small text-center text-muted py-4 border"
    >
      No Results
    </p>
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import ExSearch from '../../../Search'
import makeRequest from '../../../../util/graphql/makeRequest'
import extractNodes from '../../../../util/graphql/extractNodes'
import queryCareTeams from '../../../../graphql/queries/organization/careTeams'

export default {
  name: 'ex-step-recovery-plan-team-assignment',
  components: { ExSearch },
  data() {
    return {
      availableCareTeams: null,
      search: '',
      loading: false,
    }
  },
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['careTeam']),
    ...mapState('organization', ['organization']),
  },
  methods: {
    handleGoToStep() {
      this.$emit('next')
    },

    handleSelectCareTeam(careTeam) {
      this.setCareTeam(careTeam)
    },

    async handleCareTeamSearch(search) {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryCareTeams,
        variables: {
          organizationId: this.organization.id,
          search,
        },
      })

      if (data && !errors.length) {
        this.availableCareTeams = extractNodes(data.careTeams)
      } else {
        this.error = 'Could not get available care teams.'
      }

      this.loading = false
    },

    ...mapMutations('organization/newUser', {
      setCareTeam: 'SET_CARE_TEAM',
    }),
  },
}
</script>
