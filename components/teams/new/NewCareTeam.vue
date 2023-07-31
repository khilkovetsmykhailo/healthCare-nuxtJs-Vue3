<template>
  <b-modal
    id="new-care-team"
    modal-class="ex-new-user"
    size="lg"
    hide-footer
    hide-header
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <ex-loading v-if="creating">
        Creating Care Team...
      </ex-loading>
      <ex-step-team-details
        v-if="currentStep === 'team-details' && !creating"
        v-model="careTeamState"
        step="1"
        stepTotal="1"
        @next="handleCreateCareTeam"
      />
      <ex-step-team-finish
        v-if="currentStep === 'team-finish'"
        :care-team="createdCareTeam"
        @next="handleGoToStep"
      />
    </transition>
    <b-alert
      v-if="error"
      variant="danger"
      show
      class="mx-5"
    >
      {{ error }}
    </b-alert>
    <div class="mb-5"></div>
  </b-modal>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import ExStepTeamDetails from './steps/TeamDetails'
import ExStepTeamFinish from './steps/TeamFinish'
import makeRequest from '../../../util/graphql/makeRequest'
import mutationCreateCareTeam from '../../../graphql/mutations/careTeam/createCareTeam'

export default {
  name: 'ex-new-care-team',
  components: {
    ExStepTeamDetails,
    ExStepTeamFinish,
  },
  data() {
    return {
      creating: false,
      error: null,
      careTeamState: {
        name: null,
        description: null,
      },
      createdCareTeam: null,
      careTeamMembersState: [],
      currentStep: 'team-details',
    }
  },
  computed: {
    ...mapState('organization', ['organization']),
  },
  mounted() {
    this.busOn('new-care-team:start', this.start)
  },
  methods: {
    start() {
      this.currentStep = 'team-details'
      this.$bvModal.show('new-care-team')
    },

    handleGoToStep(step) {
      this.currentStep = step
    },

    async handleCreateCareTeam() {
      this.creating = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationCreateCareTeam,
        variables: {
          careTeam: {
            name: this.careTeamState.name,
            description: this.careTeamState.description,
            organizationId: this.organization.id,
          },
        },
      })

      if (errors.length) {
        this.error = 'Could not create care team.'
        this.creating = false
      } else {
        this.createdCareTeam = data.createCareTeam
        this.addCareTeam(data.createCareTeam)
        this.$toast.success('Care Team Created')
        this.creating = false
        this.careTeamState = { name: null, description: null }
        this.currentStep = 'team-finish'
      }
    },

    ...mapMutations('organization', {
      addCareTeam: 'ADD_CARE_TEAM',
    }),
  },
}
</script>
