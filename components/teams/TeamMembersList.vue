<template>
  <div>
    <b-row class="my-0 align-items-center py-0 justify-content-between">
      <b-col cols="auto">
        <h3 class="h5 font-weight-normal">
          <slot/>
        </h3>
      </b-col>

      <b-col
        v-if="highestRoleIndex >= 4"
        cols="auto"
      >
        <ex-icon-button
          icon="add-user"
          tag="a"
          size="sm"
          color="primary"
          class="text-primary"
          tooltip="Add User to Team"
          @click="handleAddUser"
        />
      </b-col>
    </b-row>

    <hr/>

    <b-dropdown
      id="dropdown-care-team-members-filter"
      :text="`Showing: ${getFilterText(selectedFilter)}`"
      class="mb-3"
    >
      <b-dropdown-item
        v-for="filter in filters"
        :key="filter.value"
        @click="selectedFilter = filter.value"
      >
        {{ filter.label }}
      </b-dropdown-item>
    </b-dropdown>

    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <transition name="fade" mode="out-in">
      <ex-loading v-if="loading"/>
      <div v-if="!loading && members && members.length > 0">
        <ex-user-list-item-editable
          v-for="member in filteredMembers"
          :key="`team-${member.type}-${member.id}`"
          :user="member.User"
          :can-delete="highestRoleIndex >= 4 || member.type === 'patient'"
          :can-edit="false"
          :subtitle="getOrganizationRoleTypeLabel(member.type)"
          :loading="deleting"
          tooltip-delete="Remove User"
          tooltip-cancel-delete="Cancel Removing"
          tooltip-confirm-delete="Remove User"
          @delete="handleDeleteCareTeamMember(member)"
        />
      </div>
      <div v-if="!loading && members.length <= 0">
        <p class="small text-center text-muted py-4 border">
          No Members
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import ExUserListItemEditable from '../UserListItemEditable'
import makeRequest from '../../util/graphql/makeRequest'
import mutationDeleteCareTeamMember from '../../graphql/mutations/careTeam/deleteCareTeamMember'

export default {
  name: 'ex-team-members-tab',
  components: { ExUserListItemEditable },
  props: {
    loading: { type: Boolean, required: true },
    members: { type: Array, required: true },
  },
  data() {
    return {
      deleting: false,
      error: null,
      selectedFilter: 'all',
      filters: [
        { value: 'all', label: 'All' },
        { value: 'administrator', label: 'Administrators' },
        { value: 'healthCareProvider', label: 'Health Care Providers' },
        { value: 'patient', label: 'Patients' },
      ]
    }
  },
  computed: {
    filteredMembers() {
      return this.selectedFilter === 'all'
        ? this.members
        : this.members.filter(({ type }) => type === this.selectedFilter)
    },
    ...mapState('organization/careTeam', ['careTeam']),
    ...mapGetters('currentUser', ['highestRoleIndex']),
  },
  methods: {
    getFilterText(filterValue) {
      return this.filters.find(({value}) => value === filterValue).label
    },

    getOrganizationRoleTypeLabel(type) {
      return {
        administrator: 'Administrator',
        healthCareProvider: 'Health Care Provider',
        patient: 'Patient',
      }[type]
    },

    async handleDeleteCareTeamMember(member) {
      this.deleting = true
      this.error = null

      const variables = { careTeamId: this.careTeam.id }
      switch (member.type) {
        case 'administrator':
          variables.administratorId = member.id
          break
        case 'healthCareProvider':
          variables.healthCareProviderId = member.id
          break
        case 'patient':
          variables.patientId = member.id
          break
        default:
          throw new Error(`Unrecognized member type: ${member.type}`)
      }

      const { errors } = await makeRequest(this.$axios, {
        query: mutationDeleteCareTeamMember,
        variables,
      })

      if (errors.length) {
        this.error = 'Could not remove team member.'
        this.deleting = false
        return
      }

      this.removeMember([member.type, member.id])

      this.deleting = false
    },

    handleAddUser() {
      this.busEmit('add-team-member:start')
    },

    ...mapMutations('organization/careTeam', {
      removeMember: 'REMOVE_MEMBER',
    }),
  },
}
</script>
