<template>
  <ex-modal
    id="add-team-member"
    title="Add Member To Team"
    :dismissible="!addingMember"
  >

    <ex-user-search-selector
      :search-users="handleSearchMembers"
      :disabled="addingMember"
      @select="handleSelectMember"
      @deselect="handleDeselectMember"
    />

    <hr>
    <b-row class="mt-4 mx-0 align-items-center">
      <b-button
        variant="primary"
        size="lg"
        :disabled="!selectedMember || addingMember"
        @click.prevent="handleAddMember"
      >
        Save
      </b-button>
      <b-button
        variant="clear"
        :disabled="addingMember"
        @click.prevent="cancel"
      >
        Cancel
      </b-button>

      <b-spinner
        v-if="addingMember"
        variant="primary"
        type="grow"
        size="md"
      />
    </b-row>
  </ex-modal>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import ExUserListItemEditable from '../UserListItemEditable'
import ExUserSearchSelector from '../UserSearchSelector'
import makeRequest from '../../util/graphql/makeRequest'
import extractNodes from '../../util/graphql/extractNodes'
import queryAllUsers from '../../graphql/queries/organization/allUsers'
import mutationAddCareTeamMember from '../../graphql/mutations/careTeam/addCareTeamMember'

export default {
  name: 'ex-add-team-member',
  components: {
    ExUserListItemEditable,
    ExUserSearchSelector,
  },
  props: {
    careTeam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedMember: null,
      addingMember: false,
    }
  },
  computed: {
    ...mapState('organization', ['organization']),
  },
  mounted() {
    this.busOn('add-team-member:start', this.start)
    this.busOn('add-team-member:cancel', this.cancel)
  },
  methods: {
    handleSelectMember(member) {
      this.selectedMember = member
    },

    handleDeselectMember() {
      this.selectedMember = null
    },

    async handleAddMember() {
      const member = this.selectedMember
      this.addingMember = true

      const variables = { careTeamId: this.careTeam.id }
      switch (member.type) {
        case 'administrator':
          variables.administratorId = member.administrator.id
          break
        case 'healthCareProvider':
          variables.healthCareProviderId = member.healthCareProvider.id
          break
        case 'patient':
          variables.patientId = member.patient.id
          break
        default:
          throw new Error(`Unrecognized member type: ${member.type}`)
      }

      const { errors } = await makeRequest(this.$axios, {
        query: mutationAddCareTeamMember,
        variables,
      })

      if (errors.length) {
        this.error = 'Could not add care team member'
      } else {
        this.addMember([member.type, member[member.type]]) // access nested org role
        this.selectedMember = null
        this.cancel()
        this.$toast.success('Care Team Member Added')
      }

      this.addingMember = false
    },

    async handleSearchMembers(search) {
      const { data, errors } = await makeRequest(this.$axios, {
        query: queryAllUsers,
        variables: {
          organizationId: this.organization.id,
          search,
        },
      })

      if (data && !errors.length) {
        return [
          ...extractNodes(data.organizationAdministrators)
            // Map to format user search
            .map((administrator) => ({
              ...administrator.User, // for <ex-user-list-item>
              // Member already in team
              disabled: this.careTeam.Administrators.find(({ id }) => id === administrator.id) !== undefined,
              firstName: `Administrator: ${administrator.User.firstName}`,
              administrator,
              type: 'administrator',
            })),
          ...extractNodes(data.organizationHealthCareProviders)
            // Map to format user search
            .map((healthCareProvider) => ({
              ...healthCareProvider.User, // for <ex-user-list-item>
              // Member already in team
              disabled: this.careTeam.HealthCareProviders.find(({ id }) => id === healthCareProvider.id) !== undefined,
              firstName: `Health Care Provider: ${healthCareProvider.User.firstName}`,
              healthCareProvider,
              type: 'healthCareProvider',
            })),
          ...extractNodes(data.organizationPatients)
            // Map to format user search
            .map((patient) => ({
              ...patient.User, // for <ex-user-list-item>
              // Member already in team
              disabled: this.careTeam.Patients.find(({ id }) => id === patient.id) !== undefined,
              firstName: `Patient: ${patient.User.firstName}`,
              patient,
              type: 'patient',
            })),
        ]
      }

      return null
    },

    start() {
      this.$bvModal.show('add-team-member')
    },

    cancel() {
      this.$bvModal.hide('add-team-member')
    },

    ...mapMutations('organization/careTeam', {
      addMember: 'ADD_MEMBER',
    }),
  },
}
</script>
