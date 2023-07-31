<template>
  <div class="ex-patient-tab ex-patient-tab-compliance">
    <h4 class="mb-3">Compliance</h4>

    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <b-row class="mb-3">
      <b-col>
        <b-button
          class="mr-2"
          :class="{ inactive: datePeriod !== 'days' }"
          variant="primary"
          :disabled="loading"
          @click="datePeriod = 'days'"
        >
          Daily
        </b-button>
        <b-button
          :class="{ inactive: datePeriod !== 'weeks' }"
          variant="primary"
          :disabled="loading"
          @click="datePeriod = 'weeks'"
        >
          Weekly
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ex-bar-graph
          v-if="!loading && compliance !== null"
          :data="data"
          :y-axis="['0', '50%', '100%']"
          has-pagination
          @paginate-previous="handlePaginationPrevious"
          @paginate-next="handlePaginationNext"
        />
        <ex-loading v-if="loading"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import {getDatesRangeArray} from '../../../lib/utils/getDateRangeArray'
import makeRequest from '../../../util/graphql/makeRequest'
import queryPatientCompliance from '../../../graphql/queries/patient/patientCompliance'
import {dateFormats} from '../../../plugins/filters'

// Number of x-coordinate points in the graph
const graphPointsPerPage = 9

export default {
  name: 'patient-tab-compliance',
  data() {
    return {
      compliance: null,
      loading: true,
      error: null,
      datePeriod: 'days',
      pageIndex: 0,
    }
  },
  watch: {
    datePeriod() {
      this.getCompliance()
    },

    pageIndex() {
      this.getCompliance()
    },
  },
  computed: {
    data() {
      if (this.compliance === null) return []

      const dates = getDatesRangeArray({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        interval: this.datePeriod,
      })

      return dates.map(date => {
        if (this.datePeriod === 'days') {
          const label = {
            value: date.format(dateFormats.condensed),
            description: date.format('dd'),
          }
          const foundCompliance = this.compliance.find(
            compliance => date.isSame(compliance.dateStart, 'day'),
          )
          return {
            label,
            date,
            value: foundCompliance ? foundCompliance.score : 0,
          }
        } else {
          const label = {
            value: date.format(dateFormats.condensed),
            description: 'wk',
          }
          const foundCompliance = this.compliance.find(
            compliance => date.isSame(compliance.dateStart, 'week'),
          )
          return {
            label,
            date,
            value: foundCompliance ? foundCompliance.score : 0,
          }
        }
      })
    },

    dateRange() {
      const range = Math.floor(graphPointsPerPage / 2)
      if (this.pageIndex < 0) {
        return [
          moment().subtract((graphPointsPerPage * Math.abs(this.pageIndex) + range + 1), this.datePeriod),
          moment().subtract((graphPointsPerPage * Math.abs(this.pageIndex) - range), this.datePeriod),
        ]
      } else if (this.pageIndex === 0) {
        return [
          moment().subtract(range, this.datePeriod),
          moment().add(range + 1, this.datePeriod),
        ]
      } else {
        return [
          moment().add((graphPointsPerPage * this.pageIndex) - range, this.datePeriod),
          moment().add((graphPointsPerPage * this.pageIndex) + range + 1, this.datePeriod),
        ]
      }
    },

    ...mapState('organization/patient', ['patient']),
  },
  mounted() {
    this.getCompliance()
  },
  methods: {
    async getCompliance() {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryPatientCompliance,
        variables: {
          patientId: this.patient.id,
          dateStart: this.dateRange[0].format('YYYY-MM-DD'),
          dateEnd: this.dateRange[1].format('YYYY-MM-DD'),
          period: this.datePeriod,
        },
      })

      if (data && !errors.length) {
        this.compliance = data.patientCompliance
      } else {
        this.error = 'Could not get patient compliance. Please try again later.'
      }

      this.loading = false
    },

    handlePaginationNext() {
      this.pageIndex += 1
    },

    handlePaginationPrevious() {
      this.pageIndex -= 1
    },
  },
}
</script>
