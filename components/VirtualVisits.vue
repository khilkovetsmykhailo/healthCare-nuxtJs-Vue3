<template>
  <b-modal
    v-if="healthCareProvider"
    id="virtual-visits"
    modal-class="ex-virtual-visits"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="ex-modal-header p-4">
      <h1 class="ex-new-user-step-header-title text-capitalize">
        Virtual Visits
      </h1>
      <p class="ex-new-user-step-header-description">
        View upcoming visits and book new visits.
      </p>
    </div>

    <div class="p-4">
      <b-button
        variant="primary"
        href="https://book.Demohealth.com/sign-in/"
        target="_blank"
      >
        View Booking Profile&nbsp;
        <font-awesome-icon icon="external-link-alt"/>
      </b-button>
      <p class="text-muted mt-2">
        View and manage your virtual visit appointments via our booking website.
      </p>

      <div class="mt-4">
        <h4 class="mb-4">Upcoming Virtual Visits</h4>

        <b-alert
          v-if="error"
          variant="danger"
          show
        >
          {{ error }}
        </b-alert>

        <ex-loading v-if="loading"/>

        <template v-if="!loading">
          <ex-list-item
            v-for="virtualVisit in virtualVisits"
            :key="virtualVisit.id"
            :disabled="!virtualVisitReady(virtualVisit)"
          >
            <div class="ex-list-item-text">
              <p class="text-emphasis mb-1">
                {{ virtualVisit.latePointService.name }}
              </p>
              <p class="text-muted mb-0">
                {{ getDateDisplayText(virtualVisit) }}
                {{ getTimeDisplayText(virtualVisit) }}
              </p>
            </div>

            <div class="ex-list-item-action">
              <ex-icon-button
                v-if="!joining"
                icon="external-link-alt"
                font-awesome
                tooltip="Join Virtual Visit"
                @click="handleEnterRoom(virtualVisit)"
              />
              <ex-loading
                v-if="joining"
                size="small"
                style="padding: 0 !important;"
              />
            </div>
          </ex-list-item>
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import makeRequest from '../util/graphql/makeRequest'
import queryPatientVirtualVisits from '../graphql/queries/patient/patientVirtualVisits'
import extractNodes from '../util/graphql/extractNodes'
import {formatDate} from '../plugins/filters'
import getRoomUniqueName from '../util/twilio/getRoomUniqueName'

const padZeros = value => `0${value}`.slice(-2)

const isAppointmentToday = ({ appointmentDate }) => {
  const now = new Date()
  const [, year, month, day] = appointmentDate.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)
  const nowYear = `${now.getFullYear()}`
  const nowMonth = `${padZeros(now.getMonth() + 1)}`
  const nowDay = `${padZeros(now.getDate())}`
  return nowYear === year && nowMonth === month && nowDay === day
}

const getDateDisplayText = (virtualVisit) => (
  isAppointmentToday(virtualVisit) ? 'Today' : formatDate(virtualVisit.appointmentDate)
)

const getTimeDisplayText = ({ appointmentTime }) => {
  const hours = Math.floor(appointmentTime / 60)
  const minutes = appointmentTime - (hours * 60)
  const pm = hours >= 12
  return `${padZeros(hours > 12 ? hours - 12 : hours)}:${padZeros(minutes)}${pm ? 'pm' : 'am'}`
}

const virtualVisitReady = (virtualVisit) => {
  return true // TODO remove this
  if (!isAppointmentToday(virtualVisit)) return false
  const now = new Date()
  return virtualVisit.appointmentTime - (now.getMinutes() + (now.getHours() * 60)) <= 15
}

export default {
  name: 'VirtualVisits',
  data() {
    return {
      loading: false,
      error: null,
      virtualVisits: [],
      joining: false,
    }
  },
  computed: {
    ...mapState('currentUser', { currentUser: 'user' }),

    ...mapGetters('currentUser', {
      healthCareProvider: 'healthCareProvider',
      currentUserFullName: 'fullName',
    }),
  },
  mounted() {
    this.busOn('virtual-visits', () => {
      this.$bvModal.show('virtual-visits')
      this.getVirtualVisits()
    })
  },
  methods: {
    getDateDisplayText,
    getTimeDisplayText,
    virtualVisitReady,

    handleEnterRoom(virtualVisit) {
      const videoAppBaseURLs = {
        development: 'http://localhost:3001',
        staging: 'https://stg.video.Demohealth.com',
        production: 'https://video.Demohealth.com',
      }

      const queryParameters = {
        identity: `${this.currentUser.email}__${this.currentUserFullName}`,
        room: getRoomUniqueName(virtualVisit),
        redirect: window.location,
      }

      const queryString = Object.keys(queryParameters)
        .map(queryParameter => `${queryParameter}=${queryParameters[queryParameter]}`)
        .join('&')

      window.open(
        `${videoAppBaseURLs[this.$config.env]}?${queryString}`,
        '_blank',
      )
    },

    async getVirtualVisits() {
      this.loading = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryPatientVirtualVisits,
        variables: {
          healthCareProviderId: this.healthCareProvider.organizationRole.id,
        },
      })

      if (data && !errors.length) {
        this.virtualVisits = extractNodes(data.virtualVisits)
      } else {
        this.error = 'Could not get virtual visits.'
      }

      this.loading = false
    },
  },
}
</script>
