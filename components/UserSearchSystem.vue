<template>
  <div>
    <ex-search
      :value="searchValue"
      :placeholder="`Search ${tabName} by Name`"
      @change="handleSearchChange"
    />
    <b-tabs
      v-if="organization"
      class="ex-button-tabs mb-3"
      pills
      small
      fill
      :nav-wrapper-class="highestRoleIndex >= 3 ? '' : 'd-none'"
      :value="tabIndex"
      @input="handleTabChange"
    >
      <b-tab
        v-if="highestRoleIndex >= 3"
        title="Care Teams"
        class="py-3"
      >
        <ex-loading v-if="loading.careTeams" size="small"/>
        <div v-else-if="careTeams !== null">
          <p
            v-if="!careTeams.length"
            class="text-center text-muted py-4 border"
          >
            No care teams found.
          </p>
          <template v-else>
            <ex-pagination
              class="mb-3"
              :has-next="pageInfo.careTeams.hasNext"
              :has-previous="pageInfo.careTeams.hasPrevious"
              @next="getNextPage('careTeams')"
              @previous="getPreviousPage('careTeams')"
            />
            <ex-team-list-item
              v-for="careTeam in careTeams"
              :key="`care-team-${careTeam.id}`"
              :care-team="careTeam"
              :active="activeCareTeam && activeCareTeam.id === careTeam.id"
              tag="button"
              @click.native="handleGoToCareTeam(careTeam)"
            />
            <ex-pagination
              class="mt-3"
              :has-next="pageInfo.careTeams.hasNext"
              :has-previous="pageInfo.careTeams.hasPrevious"
              @next="getNextPage('careTeams')"
              @previous="getPreviousPage('careTeams')"
            />
          </template>
        </div>
      </b-tab>

      <b-tab
        v-if="highestRoleIndex >= 3"
        title="Clinical Users"
        class="py-3"
      >
        <ex-loading v-if="loading.clinicalUsers" size="small"/>
        <div v-else-if="clinicalUsers !== null">
          <p
            v-if="!clinicalUsers.length"
            class="text-center text-muted py-4 border"
          >
            No clinical users found.
          </p>
          <template v-else>
            <ex-pagination
              class="mb-3"
              :has-next="clinicalUsersPageInfo.hasNext"
              :has-previous="clinicalUsersPageInfo.hasPrevious"
              @next="getNextPage('clinicalUsers')"
              @previous="getPreviousPage('clinicalUsers')"
            />
            <ex-user-list-item
              v-for="clinicalUser in clinicalUsers"
              :key="`${clinicalUser.type}-${clinicalUser.id}`"
              :user="clinicalUser.User"
              :subtitle="clinicalUser.type"
              tag="span"
              @chat="handleChat(clinicalUser)"
            />
            <ex-pagination
              class="mt-3"
              :has-next="clinicalUsersPageInfo.hasNext"
              :has-previous="clinicalUsersPageInfo.hasPrevious"
              @next="getNextPage('clinicalUsers')"
              @previous="getPreviousPage('clinicalUsers')"
            />
          </template>
        </div>
      </b-tab>

      <b-tab
        title="Patients"
        class="py-3"
      >
        <!-- If only a PT, tab button will be hidden, so add header instead -->
        <h4
          v-if="highestRoleIndex <= 2"
          class="mb-4"
        >
          Patients
        </h4>

        <b-button
          :variant="patientFilterOpen ? undefined : 'light'"
          class="mr-2"
          v-b-toggle.patient-list-filter
        >
          <font-awesome-icon icon="filter"/>
          Filter
        </b-button>
        <b-button
          :variant="patientSortOpen ? undefined : 'light'"
          v-b-toggle.patient-list-sort
        >
          <font-awesome-icon icon="sort"/>
          Sort
        </b-button>

        <div class="row">
          <div class="col-12" :class="{'col-md-8 col-lg-6 col-xl-4': !condensed}">
            <b-collapse
              id="patient-list-sort"
              v-model="patientSortOpen"
              @show="patientFilterOpen = false"
            >
              <div class="d-flex mt-2 justify-content-between align-items-center">
                <b-form-select
                  v-model="patientOrderBy"
                  :disabled="loading.patients"
                  :options="patientOrderByOptions"
                  style="flex-grow: 0"
                />

                <!--                <ex-icon-button-->
                <!--                  :icon="patientOrder === 'asc' ? 'chevron-up' : 'chevron-down'"-->
                <!--                  font-awesome-->
                <!--                  class="ml-2"-->
                <!--                  style="flex-shrink: 0"-->
                <!--                  @click="patientOrder = patientOrder === 'asc' ? 'desc' : 'asc'"-->
                <!--                />-->
              </div>
            </b-collapse>

            <b-collapse
              id="patient-list-filter"
              v-model="patientFilterOpen"
              @show="patientSortOpen = false"
            >
              <div class="mt-3">
                <b-form-select
                  v-model="patientFilterBySurgery"
                  :disabled="loading.patients"
                  :options="surgeryOptions"
                  style="flex-grow: 0"
                />
              </div>
            </b-collapse>
          </div>
        </div>

        <ex-loading v-if="loading.patients" size="small"/>
        <div v-else-if="patients !== null" class="my-3">
          <p
            v-if="!patients.length"
            class="text-center text-muted py-4 border"
          >
            No patients found.
          </p>
          <template v-else>
            <ex-pagination
              class="mb-3"
              :has-next="pageInfo.patients.hasNext"
              :has-previous="pageInfo.patients.hasPrevious"
              @next="getNextPage('patients')"
              @previous="getPreviousPage('patients')"
            />
            <ex-patient-list-item
              v-for="patient in patients"
              :key="`patient-${patient.id}`"
              :user="patient.User"
              :compliance="patient.averageCompliance"
              :pain="patient.averagePain"
              :surgery="patient.Surgery ? patient.Surgery.name : undefined"
              :days="getSurgeryDays(patient.surgery)"
              :condensed="condensed"
              :active="activePatient && activePatient.id === patient.id"
              show-chat
              tag="button"
              @chat="handleChat(patient)"
              @click.native="handleGoToPatient(patient)"
            />
            <ex-pagination
              class="mt-3"
              :has-next="pageInfo.patients.hasNext"
              :has-previous="pageInfo.patients.hasPrevious"
              @next="getNextPage('patients')"
              @previous="getPreviousPage('patients')"
            />
          </template>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import ExIconButton from '~/components/IconButton'
import ExPage from '~/components/Page'
import ExSearch from '~/components/Search'
import ExUserListItem from '~/components/UserListItem'
import ExUserSummary from '~/components/UserSummary'
import ExChat from '~/components/chat/Chat'
import ExUserSearchSystem from '../components/UserSearchSystem'

export default {
  name: 'user-search-system',
  components: {
    ExPage,
    ExIconButton,
    ExSearch,
    ExUserListItem,
    ExUserSummary,
    ExChat,
    ExUserSearchSystem,
  },
  props: {
    condensed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const patientOrderByOptions = [
      { text: 'First Name', value: '$User.firstName$' },
      { text: 'Last Name', value: '$User.lastName$' },
      { text: 'Pain', value: 'average_pain' },
      { text: 'Compliance', value: 'average_compliance' },
    ]

    return {
      patientOrderByOptions,
      loading: {
        patients: false,
        careTeams: false,
        clinicalUsers: false,
      },
      search: {
        patients: '',
        careTeams: '',
        clinicalUsers: '',
      },
      pagination: {
        careTeams: { before: null, after: null },
        administrators: { before: null, after: null },
        healthCareProviders: { before: null, after: null },
        patients: { before: null, after: null },
      },
      patientSortOpen: false,
      patientFilterBySurgery: null,
      patientFilterOpen: false,
      patientOrder: 'asc',
      patientOrderBy: patientOrderByOptions[0].value,
    }
  },
  computed: {
    searchValue() {
      return this.search[(
        ['careTeams', 'clinicalUsers', 'patients'][this.tabIndex]
      )]
    },

    clinicalUsers() {
      if (this.administrators === null || this.healthCareProviders === null) return null
      return [
        ...this.administrators,
        ...this.healthCareProviders,
      ]
    },

    clinicalUsersPageInfo() {
      return {
        hasNext: this.pageInfo.administrators.hasNext || this.pageInfo.healthCareProviders.hasNext,
        hasPrevious: this.pageInfo.administrators.hasPrevious || this.pageInfo.healthCareProviders.hasPrevious,
      }
    },

    tabName() {
      const tabs = this.highestRoleIndex <= 2
        ? ['Patients']
        : ['Teams', 'Clinical Users', 'Patients']
      return tabs[this.tabIndex]
    },

    surgeryOptions() {
      return [
        {
          text: 'All Surgeries',
          value: null,
        },
        ...this.surgeries.map((surgery) => ({
          text: surgery.name,
          value: surgery.id,
        })),
      ]
    },

    ...mapState('organization/patient', { activePatient: 'patient' }),
    ...mapState('organization/careTeam', { activeCareTeam: 'careTeam' }),

    ...mapState('organization', [
      'organization',
      'careTeams',
      'administrators',
      'healthCareProviders',
      'patients',
      'pageInfo',
    ]),

    ...mapState('static', [
      'surgeries',
    ]),

    ...mapState('page', {
      tabIndex: 'userSearchSystemTabIndex',
    }),

    ...mapGetters('currentUser', ['highestRoleIndex']),
  },
  watch: {
    '$route.query'() {
      this.setInitialQueryParameters()
      this.handleGetData(true)
    },

    patientOrderBy(orderBy) {
      // Reset cursors (basically settint page index back to 0)
      this.pagination.patients.after = null
      this.pagination.patients.before = null
      this.handleGetPatients()
      this.$router.push({ query: { ...this.getQueryParameters(), 'order-by': orderBy } })
    },

    patientOrder(order) {
      this.handleGetPatients()
      this.$router.push({ query: { ...this.getQueryParameters(), order } })
    },

    patientFilterBySurgery(surgery) {
      this.handleGetPatients()
      this.$router.push({ query: { ...this.getQueryParameters(), surgery } })
    },
  },
  async mounted() {
    this.setInitialQueryParameters()
  },
  methods: {
    getNextPage(which) {
      switch (which) {
        case 'careTeams':
          this.pagination.careTeams.after = this.clinicalUsersPageInfo.endCursor
          this.pagination.careTeams.before = null
          this.handleGetCareTeams()
          break
        case 'clinicalUsers':
          this.pagination.administrators.after = this.pageInfo.administrators.endCursor
          this.pagination.healthCareProviders.after = this.pageInfo.healthCareProviders.endCursor
          this.pagination.administrators.before = null
          this.pagination.healthCareProviders.before = null
          this.handleGetClinicalUsers()
          break
        case 'patients':
          this.pagination.patients.after = this.pageInfo.patients.endCursor
          this.pagination.patients.before = null
          this.handleGetPatients()
          break
      }
    },

    getPreviousPage(which) {
      switch (which) {
        case 'careTeams':
          this.pagination.careTeams.before = this.clinicalUsersPageInfo.startCursor
          this.pagination.careTeams.after = null
          this.handleGetCareTeams()
          break
        case 'clinicalUsers':
          this.pagination.administrators.before = this.pageInfo.administrators.startCursor
          this.pagination.healthCareProviders.before = this.pageInfo.healthCareProviders.startCursor
          this.pagination.administrators.after = null
          this.pagination.healthCareProviders.after = null
          this.handleGetClinicalUsers()
          break
        case 'patients':
          this.pagination.patients.before = this.pageInfo.patients.startCursor
          this.pagination.patients.after = null
          this.handleGetPatients()
          break
      }
    },

    setInitialQueryParameters() {
      const queryParameters = this.getQueryParameters()
      if (queryParameters['order-by']) this.patientOrderBy = queryParameters['order-by']
      if (queryParameters.order) this.patientOrder = queryParameters.order
      if (queryParameters.surgery) this.patientFilterBySurgery = parseInt(queryParameters.surgery, 10)
    },

    getQueryParameters() {
      return {
        'order-by': this.$route.query['order-by'],
        order: this.$route.query.order,
        surgery: this.$route.query.surgery,
      }
    },

    async handleGetCareTeams() {
      this.loading.careTeams = true
      await this.getCareTeams({ pagination: this.pagination.careTeams, search: this.search.careTeams })
      this.loading.careTeams = false
    },

    async handleGetPatients() {
      this.loading.patients = true
      await this.getPatients({
        pagination: this.pagination.patients,
        search: this.search.patients,
        surgery: this.patientFilterBySurgery,
        order: this.patientOrder,
        // Convert from snake case to camel case
        orderBy: this.patientOrderBy.replace(/_\w/g, (match) => match.charAt(1).toUpperCase()),
      })
      this.loading.patients = false
    },

    async handleGetClinicalUsers() {
      this.loading.clinicalUsers = true
      await this.getClinicalUsers({
        administratorsPagination: this.pagination.administrators,
        healthCareProvidersPagination: this.pagination.healthCareProviders,
        search: this.search.clinicalUsers,
      })
      this.loading.clinicalUsers = false
    },

    getSurgeryDays(surgery) {
      if (!surgery) return undefined
      // TODO Figure out what is supposed to show here
      return this.$moment().diff(surgery.surgeryDate, 'days')
    },

    handleGetData(force = false) {
      switch (this.tabIndex) {
        // Teams
        case 0:
          if (force || this.careTeams === null) this.handleGetCareTeams()
          break
        // Users
        case 1:
          if (force || this.clinicalUsers === null) this.handleGetClinicalUsers()
          break
        // Patients
        case 2:
          if (force || this.patients === null) this.handleGetPatients()
          break
      }
    },

    handleSearchChange(value) {
      const tab = ['careTeams', 'clinicalUsers', 'patients'][this.tabIndex]
      this.search[tab] = value

      // Reset pagination when searching
      switch (tab) {
        case 'careTeams':
        case 'patients':
          this.pagination[tab].after = null
          this.pagination[tab].before = null
          break
        case 'clinicalUsers':
          this.pagination.administrators.after = null
          this.pagination.administrators.before = null
          this.pagination.healthCareProviders.after = null
          this.pagination.healthCareProviders.before = null
          break
      }

      this.handleGetData(true)
    },

    handleTabChange(index) {
      if (index === undefined) return
      this.setTab(index)
      this.handleGetData()
    },

    handleGoToPatient(patient) {
      this.$router.push(`/${this.organization.slug}/patients/${patient.id}`)

      // Clear out store after next page transition completes
      setTimeout(() => {
        this.clearCareTeam()
      }, 1000)
    },

    handleGoToCareTeam(careTeam) {
      this.$router.push(`/${this.organization.slug}/care-teams/${careTeam.id}`)

      // Clear out store after next page transition completes
      setTimeout(() => {
        this.clearPatient()
      }, 1000)
    },

    handleChat(organizationRole) {
      this.setCurrentOrganizationUser(organizationRole)
    },

    // getHasUnread(userOrganizationRole) {
    //   const { channels } = userOrganizationRole
    //   return this.unreadMessages.reduce((hasUnread, message) => (
    //     hasUnread ? true : channels.includes(message.channel_id)
    //   ), false)
    // },

    ...mapMutations('organization/patient', { clearPatient: 'CLEAR' }),
    ...mapMutations('organization/careTeam', { clearCareTeam: 'CLEAR' }),
    ...mapMutations('organization/chat', { setCurrentOrganizationUser: 'SET_CURRENT_ORGANIZATION_USER' }),

    ...mapActions('organization', {
      getCareTeams: 'GET_CARE_TEAMS',
      getClinicalUsers: 'GET_CLINICAL_USERS',
      getPatients: 'GET_PATIENTS',
    }),

    ...mapActions('page', {
      setTab: 'SET_USER_SEARCH_SYSTEM_TAB_INDEX',
    }),
  },
}
</script>
