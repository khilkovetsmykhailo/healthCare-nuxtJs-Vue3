<template>
  <div class="ex-patient-tab ex-patient-tab-milestones">
    <h4 class="mb-3">Milestones</h4>

    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <ex-loading v-if="loading"/>

    <table
      v-if="recoveryPlanMilestones !== null"
      class="table table-striped"
    >
      <tbody>
      <tr
        v-for="recoveryPlanMilestone in recoveryPlanMilestones"
        :key="recoveryPlanMilestone.id"
      >
        <td
          class="ex-milestone-status"
          :class="[recoveryPlanMilestone.status]"
        >
          <font-awesome-icon
            :icon="getStatusIcon(recoveryPlanMilestone)"
            class="ex-milestone-status-icon mr-2"
            size="lg"
          />
          {{ getStatusText(recoveryPlanMilestone) }}
          <span v-if="recoveryPlanMilestone.completedOn || recoveryPlanMilestone.skippedOn">
            {{ recoveryPlanMilestone.completedOn || recoveryPlanMilestone.skippedOn | formatDate }}
          </span>
        </td>

        <td class="ex-milestone-name">
          {{ recoveryPlanMilestone.name }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import makeRequest from '../../../util/graphql/makeRequest'
import queryMilestones from '../../../graphql/queries/recoveryPlan/milestones'
import queryPatientProgress from '../../../graphql/queries/patient/patientProgress'

const getMilestoneStatus = ({ completedOn, skippedOn }) => {
  if (!completedOn && !skippedOn) return 'incomplete'
  if (completedOn) return 'complete'
  if (skippedOn) return 'skipped'
}

export default {
  name: 'patient-tab-milestones',
  data() {
    return {
      patientProgress: null,
      recoveryPlanMilestones: null,
      loading: true,
      error: null,
    }
  },
  computed: {
    ...mapGetters('organization/patient', ['recoveryPlan']),
  },
  mounted() {
    if (this.recoveryPlan.planType === 'PT') {
      this.getPTMilestones()
    } else {
      this.getSurgeryMilestones()
    }
  },
  methods: {
    getStatusIcon({ status }) {
      switch (status) {
        case 'complete':
          return 'check-circle'
        case 'incomplete':
          return 'circle'
        case 'skipped':
          return 'times-circle'
        default:
          throw new Error(`Unknown milestone status: ${status}`)
      }
    },

    getStatusText({ status }) {
      switch (status) {
        case 'complete':
          return this.recoveryPlan.planType === 'SURGERY' ? 'Completed on' : 'Complete'
        case 'incomplete':
          return 'Not Complete'
        case 'skipped':
          return 'Skipped on'
        default:
          throw new Error(`Unknown milestone status: ${status}`)
      }
    },

    async getPatientProgress() {
      this.loading = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryPatientProgress,
        variables: {
          recoveryPlanId: this.recoveryPlan.id,
        },
      })

      if (data && !errors.length) {
        this.patientProgress = data.patientProgress
      } else {
        this.error = 'Could not get patient progress.'
      }

      this.loading = false
    },

    async getPTMilestones() {
      await this.getPatientProgress()
      if (this.error) return

      const { completedSessions } = this.patientProgress

      const sessionMilestoneMarks = [1, 10, 20, 30, 40, 60, 80, 100, 125, 150, 175, 200]
      const allMilestones = sessionMilestoneMarks.map((milestoneMark) => ({
        id: milestoneMark,
        name: `${milestoneMark} Session${milestoneMark === 1 ? '' : 's'}`,
        status: completedSessions >= milestoneMark ? 'complete' : 'incomplete',
      }))

      let milestones = []
      let milestoneIndex = 0
      let lastMilestoneMark = 0
      let uncompletedMilestones = 0
      while (uncompletedMilestones < 5) {
        if (allMilestones[milestoneIndex]) {
          // Existing milestone
          const existingMilestone = allMilestones[milestoneIndex]
          milestones.push(existingMilestone)
          lastMilestoneMark = existingMilestone.id
          if (existingMilestone.status !== 'complete') uncompletedMilestones += 1
        } else {
          // Milestone beyond marks, so increase by 50
          const newMilestoneMark = lastMilestoneMark + 50
          const newMilestone = {
            id: newMilestoneMark,
            name: `${newMilestoneMark} Sessions`,
            status: completedSessions >= newMilestoneMark ? 'complete' : 'incomplete',
          }
          milestones.push(newMilestone)
          lastMilestoneMark = newMilestoneMark
          if (newMilestone.status !== 'complete') uncompletedMilestones += 1
        }

        milestoneIndex += 1
      }


      this.recoveryPlanMilestones = milestones
    },

    async getSurgeryMilestones() {
      this.loading = true
      const { data, errors } = await makeRequest(this.$axios, {
        query: queryMilestones,
        variables: {
          recoveryPlanId: this.recoveryPlan.id,
        },
      })

      if (data && !errors.length) {
        this.recoveryPlanMilestones = data.recoveryPlanMilestones.map((milestone) => ({
          id: milestone.id,
          name: milestone.Milestone.name,
          status: getMilestoneStatus(milestone),
          completedOn: milestone.completedOn,
          skippedOn: milestone.skippedOn,
        }))
      } else {
        this.error = 'Could not get patient milestones. Please try again later.'
      }
      this.loading = false
    },
  },
}
</script>
