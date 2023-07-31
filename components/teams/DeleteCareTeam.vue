<template>
  <ex-modal
    id="delete-care-team"
    title="Delete Care Team"
    description="Are you sure?"
    variant="danger"
    @close="handleCancel"
  >
    <b-alert
      v-if="error"
      variant="danger"
      class="mb-3"
      show
    >
      {{ error }}
    </b-alert>

    <transition mode="out-in" name="fade">
      <ex-loading v-if="deleting">
        Deleting Care Team...
      </ex-loading>

      <div v-if="!deleting">
        <p class="mb-1">
          Once a care team is deleted, its data and information will not be able to be recovered.
        </p>

        <p class="mb-3 text-muted">
          (Members will <strong>not</strong> be deleted)
        </p>

        <label
          for="confirm-delete-team"
          class="mb-2"
        >
          In order to confirm deleting, please enter the care team name, as it appears:<br>
          <strong>{{ this.careTeam.name }}</strong>
        </label>

        <b-form-input
          v-model="confirmTeamText"
          id="confirm-delete-team"
          placeholder="Enter care team name"
          class="mb-5"
        />

        <b-button
          variant="danger"
          size="lg"
          :disabled="!hasConfirmed"
          @click="handleConfirm"
        >
          Delete Care Team
        </b-button>
        <b-button
          variant="clear"
          @click="handleCancel"
        >
          Cancel
        </b-button>
      </div>
    </transition>
  </ex-modal>
</template>

<script>
import {mapState} from 'vuex'
import makeRequest from '../../util/graphql/makeRequest'
import mutationDeleteCareTeam from '../../graphql/mutations/careTeam/deleteCareTeam'

export default {
  name: 'ex-delete-care-team',
  props: {
    careTeam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      confirmTeamText: '',
      deleting: false,
      error: null,
    }
  },
  computed: {
    hasConfirmed() {
      return this.confirmTeamText === this.careTeam.name
    },

    ...mapState('organization', ['organization']),
  },
  mounted() {
    this.busOn('delete-care-team:start', this.start)
    this.busOn('delete-care-team:cancel', this.cancel)
  },
  methods: {
    start() {
      this.$bvModal.show('delete-care-team')
    },

    handleCancel() {
      this.confirmTeamText = ''
      this.$bvModal.hide('delete-care-team')
    },

    async handleConfirm() {
      this.deleting = true
      this.error = null

      const { errors } = await makeRequest(this.$axios, {
        query: mutationDeleteCareTeam,
        variables: { id: this.careTeam.id },
      })

      if (errors.length) {
        this.error = 'Could not delete care team.'
        this.deleting = false
      } else {
        this.$toast.success('Care Team Deleted')
        this.deleting = false
        this.$router.push(`/${this.organization.slug}`)
      }
    },
  },
}
</script>
