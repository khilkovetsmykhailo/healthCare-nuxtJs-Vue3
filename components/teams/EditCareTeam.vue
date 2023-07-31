<template>
  <ex-modal
    id="edit-care-team"
    title="Edit Care Team"
  >
    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <b-form-input
      v-model="careTeamState.name"
      size="lg"
      placeholder="Enter a care team name"
      class="mb-4"
    />
    <div>
      <b-button
        variant="primary"
        size="lg"
        @click="save()"
      >
        Save
      </b-button>
      <b-button
        variant="clear"
        @click="cancel()"
      >
        Cancel
      </b-button>
    </div>
  </ex-modal>
</template>

<script>
import {mapMutations} from 'vuex'
import makeRequest from '../../util/graphql/makeRequest'
import mutationUpdateCareTeam from '../../graphql/mutations/careTeam/updateCareTeam'

export default {
  name: 'ex-edit-care-team',
  props: {
    careTeam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      careTeamState: {
        name: this.careTeam.name,
      },
    }
  },
  mounted() {
    this.busOn('edit-care-team:start', this.start)
    this.busOn('edit-care-team:cancel', this.cancel)
  },
  methods: {
    async save() {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationUpdateCareTeam,
        variables: {
          careTeam: {
            id: this.careTeam.id,
            name: this.careTeamState.name,
          },
        },
      })

      if (data && !errors.length) {
        this.$toast.success('Care Team Saved')
        this.updateCareTeam(this.careTeamState)
        this.cancel()
      } else {
        this.error = 'Could not edit care team. Please try again later.'
      }

      this.loading = false
    },

    start() {
      this.$bvModal.show('edit-care-team')
    },

    cancel() {
      this.$bvModal.hide('edit-care-team')
    },

    ...mapMutations('organization/careTeam', {
      updateCareTeam: 'UPDATE_CARE_TEAM',
    }),
  },
}
</script>






































BREAKPOINT

hope you had a great camping trip!!!

so nice. working on care teams. Just finished updating care team, next is delete, then the users/patients
adding/removing for care teams
