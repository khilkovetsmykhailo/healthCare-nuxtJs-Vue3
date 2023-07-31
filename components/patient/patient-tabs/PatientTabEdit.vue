<template>
  <div class="ex-patient-tab ex-patient-tab-edit">
    <!-- SURGEON -->
    <b-row>
      <b-col>
        <!-- ERRORS -->
        <b-alert
          v-for="(error, errorIndex) in surgeonErrors"
          :key="errorIndex"
          variant="danger"
          show
        >
          {{ error }}
        </b-alert>

        <h5 class="mb-2">Surgeon</h5>

        <p class="text-muted">
          This is the patient's assigned surgeon for their recovery plan surgery. A surgeon can be removed or set from
          here.
        </p>

        <!-- SURGEON SEARCH -->
        <ex-hcp-search
          v-if="planSurgery"
          :confirm-text="`Confirm setting this surgeon as ${patientFullName}'s surgeon?`"
          hcp-label="surgeon"
          no-hcp-text="Patient does not have a surgeon."
          :selected-hcp="planSurgeon"
          @confirm="handleSetSurgeon"
          @remove="handleRemoveSurgeon"
        />

        <!-- NO SURGERY -->
        <b-alert v-if="!planSurgery" show>Patient does not have a surgery.</b-alert>
      </b-col>
    </b-row>

    <!-- SEPARATOR -->
    <div class="my-4">
      <hr>
    </div>

    <!-- PHYSICAL THERAPIST -->
    <b-row>
      <b-col>
        <!-- ERRORS -->
        <b-alert
          v-for="(error, errorIndex) in ptErrors"
          :key="errorIndex"
          variant="danger"
          show
        >
          {{ error }}
        </b-alert>

        <h5 class="mb-2">Physical Therapists</h5>

        <p class="text-muted">
          This is the patient's assigned physical therapists for their recovery plan. Physical therapists can be removed
          or added from here.
        </p>

        <!-- PHYSICAL THERAPIST SEARCH -->
        <ex-hcp-search
          :confirm-text="`Confirm adding this physical therapist for ${patientFullName}?`"
          hcp-label="physical therapist"
          no-hcp-text="Patient does not have any physical therapists."
          :selected-hcps="patient.PhysicalTherapists"
          multiple
          @confirm="handleAddPhysicalTherapist"
          @remove="handleRemovePhysicalTherapist"
        >
          <template #actions="{ hcp }">
            <ex-icon-button
              class="mr-1"
              font-awesome
              :icon="hcp.PhysicalTherapistAssignment.active ? ['fas', 'star'] : ['far', 'star']"
              :tooltip="hcp.PhysicalTherapistAssignment.active ? 'Remove as active physical therapist' : 'Set as active physical therapist'"
              @click="togglePhysicalTherapistAssignmentActive(hcp)"
            />
          </template>
        </ex-hcp-search>
      </b-col>
    </b-row>

    <!-- SEPARATOR -->
    <div class="my-4">
      <hr>
    </div>

    <!-- LINK TO USER INFORMATION -->
    <div v-if="currentUserIsSystemAdministrator">
      The above information is for this patient inside of this organization. To view or edit more user details,
      <router-link :to="`/users/${patient.User.id}`">click here</router-link>
      .
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import makeRequest from '../../../util/graphql/makeRequest'
import mutationUpdatePlanSurgery from '../../../graphql/mutations/recoveryPlan/updatePlanSurgery'
import mutationCreatePhysicalTherapistAssignment
  from '../../../graphql/mutations/physicalTherapistAssignment/createPhysicalTherapistAssignment'
import mutationDeletePhysicalTherapistAssignment
  from '../../../graphql/mutations/physicalTherapistAssignment/deletePhysicalTherapistAssignment'
import mutationUpdatePhysicalTherapistAssignment
  from '../../../graphql/mutations/physicalTherapistAssignment/updatePhysicalTherapistAssignment'

export default {
  name: 'patient-tab-edit',
  data() {
    return {
      removingPhysicalTherapist: false,
      removingSurgeon: false,
      addingPhysicalTherapist: false,
      settingSurgeon: false,
      updatePhysicalTherapistError: null,
      updateSurgeonError: null,
      updatingPhysicalTherapist: false,
    }
  },
  computed: {
    ptErrors() {
      return [
        this.updatePhysicalTherapistError,
      ].filter((error) => error !== null)
    },

    surgeonErrors() {
      return [
        this.updateSurgeonError,
      ].filter((error) => error !== null)
    },

    ...mapState('organization/patient', ['patient']),
    ...mapGetters('organization/patient', ['planSurgeon', 'planSurgery', 'patientFullName']),
  },
  methods: {
    async handleUpdatePlanSurgery({ surgeonId }) {
      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationUpdatePlanSurgery,
        variables: {
          recoveryPlanSurgery: {
            id: this.planSurgery.id,
            surgeonId,
          },
        },
      })

      if (data && !errors.length) {
        this.setPlanSurgery(data.updateRecoveryPlanSurgery)
      } else {
        this.settingSurgeon = false
        this.updateSurgeonError = 'Could not update plan surgeon.'
      }
    },

    async handleSetSurgeon(surgeon) {
      this.settingSurgeon = true

      await this.handleUpdatePlanSurgery({
        surgeonId: surgeon.id, // add surgeon
      })

      this.settingSurgeon = false
    },

    async handleRemoveSurgeon() {
      this.removingSurgeon = true

      await this.handleUpdatePlanSurgery({
        surgeonId: null, // remove surgeon
      })

      this.removingSurgeon = false
    },

    async handleAddPhysicalTherapist(hcp) {
      this.addingPhysicalTherapist = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationCreatePhysicalTherapistAssignment,
        variables: {
          physicalTherapistAssignment: {
            active: true,
            patientId: this.patient.id,
            physicalTherapistId: hcp.id,
          },
        },
      })

      if (data && !errors.length) {
        this.addPhysicalTherapist({
          id: hcp.id,
          // id of "User" will actually be of the HCP, but should be a non-issue
          User: hcp,
          // Add assignment so "id" is available for deletion
          PhysicalTherapistAssignment: {
            id: data.createPhysicalTherapistAssignment.id,
          },
        })
      } else {
        this.updatePhysicalTherapistError = 'Could not add patient physical therapist.'
      }

      this.addingPhysicalTherapist = false
    },

    async handleRemovePhysicalTherapist(physicalTherapist) {
      this.removingPhysicalTherapist = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationDeletePhysicalTherapistAssignment,
        variables: {
          id: physicalTherapist.PhysicalTherapistAssignment.id,
        },
      })

      if (data && !errors.length) {
        this.removePhysicalTherapist(physicalTherapist.id)
      } else {
        this.updatePhysicalTherapistError = 'Could not remove patient physical therapist.'
      }

      this.removingPhysicalTherapist = false
    },

    async togglePhysicalTherapistAssignmentActive(physicalTherapist) {
      this.updatingPhysicalTherapist = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationUpdatePhysicalTherapistAssignment,
        variables: {
          physicalTherapistAssignment: {
            id: physicalTherapist.PhysicalTherapistAssignment.id,
            active: !physicalTherapist.PhysicalTherapistAssignment.active, // reverse "active"
          },
        },
      })

      if (data && !errors.length) {
        this.updatePhysicalTherapist({
          id: physicalTherapist.id,
          PhysicalTherapistAssignment: data.updatePhysicalTherapistAssignment,
        })
      } else {
        this.updatePhysicalTherapistError = 'Could not update patient physical therapist.'
      }

      this.updatingPhysicalTherapist = false
    },

    ...mapMutations('organization/patient', {
      addPhysicalTherapist: 'ADD_PHYSICAL_THERAPIST',
      setPlanSurgery: 'SET_PLAN_SURGERY',
      removePhysicalTherapist: 'REMOVE_PHYSICAL_THERAPIST',
      updatePhysicalTherapist: 'UPDATE_PHYSICAL_THERAPIST',
    }),
  },
}
</script>
