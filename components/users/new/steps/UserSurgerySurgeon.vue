<template>
  <ex-step
    title="Surgeon"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please enter the surgeon for this patient"
    @submit="handleGoToStep"
    @skip="handleGoToStep"
    @back="handleGoToStep"
    :next-step-disabled="surgery.surgeon === null"
    :skip-step-disabled="surgery.surgeon !== null"
    has-skip-step
  >
    <b-alert
      variant="warning"
      show
      class="mb-5"
    >
      Please note: If you need to change the surgery details later, the user will need to be deleted and created
      again. Ability to edit surgery details coming soon.
    </b-alert>

    <ex-user-list-item-editable
      v-if="selectedSurgeon !== null"
      :user="selectedSurgeon"
      instant-delete
      :can-edit="false"
      tooltip-delete="Change Surgeon"
      tooltip-cancel-delete="Cancel Removing Surgeon"
      @edit="handleStartSurgeonSearch"
      @delete="handleUnselectSurgeon"
    />

    <ex-user-search
      v-if="selectedSurgeon === null"
      :users="availableSurgeons || []"
      :loading="loading"
      placeholder="Search for a surgeon by name"
      @search="handleSurgeonSearch"
      @select="handleSelectSurgeon"
    />
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import makeRequest from '../../../../util/graphql/makeRequest'
import extractNodes from '../../../../util/graphql/extractNodes'
import queryHealthCareProviders from '../../../../graphql/queries/organization/healthCareProviders'

export default {
  name: 'ex-step-user-event-user-organization-role',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  data() {
    return {
      availableSurgeons: [],
      selectedSurgeon: null,
      loading: null,
      error: null,
    }
  },
  computed: {
    ...mapState('organization/newUser', ['surgery']),
    ...mapState('organization', ['organization']),
  },
  methods: {
    handleGoToStep() {
      this.$emit('next')
    },

    handleStartSurgeonSearch() {
      this.availableSurgeons = []
      this.selectedSurgeon = null
      this.setSurgeryField(['surgeon', null])
    },

    handleSelectSurgeon(surgeon) {
      this.setSurgeryField(['surgeon', surgeon])
      this.selectedSurgeon = surgeon
    },

    handleUnselectSurgeon() {
      this.selectedSurgeon = null
      this.setSurgeryField(['surgeon', null])
    },

    async handleSurgeonSearch(search) {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryHealthCareProviders,
        variables: {
          organizationId: this.organization.id,
          search,
        },
      })

      if (data && !errors.length) {
        this.availableSurgeons = extractNodes(data.organizationHealthCareProviders).map(({ id, User }) => ({
          ...User,
          id, // kind of weird, but flatten HCP object to have User fields, but also still have the HCP ID
        }))
      } else {
        this.error = 'Could not get available surgeons.'
      }

      this.loading = false
    },

    ...mapMutations('organization/newUser', {
      setSurgeryField: 'SET_SURGERY_FIELD',
    }),
  },
}
</script>
