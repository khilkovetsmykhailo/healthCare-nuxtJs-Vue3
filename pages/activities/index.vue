<template>
  <div class="Demo-app">
    <ex-page>
      <template slot="header">
        <h1 class="display-5 font-weight-light py-0 my-0">Activities</h1>
      </template>

      <template slot="actions">
        <ex-icon-button
          size="lg"
          class="mr-2"
          icon="plus"
          tooltip="Create New Activity"
          @click.native="busEmit('new-activity:start')"
          v-if="currentUserIsSystemAdministrator"
        />
      </template>

      <template slot="side-nav">
        <transition name="fade" mode="out-in">
          <ex-loading v-if="loadingOrganizations"/>
          <div v-if="!loadingOrganizations">
            <ex-search
              @change="getActivities"
              v-model="search"
              placeholder="Search Activities by Name"
            />
            <hr/>
            <ex-button-select
              :disabled="loadingActivities"
              :options="activityTypes"
              :selected="selectedActivityTypes"
              @change="toggleActivityType"
              button-class="w-100"
            />
            <hr/>
            <b-row class="justify-content-center mt-3">
              <b-col cols="auto">
                <ex-pagination
                  :disabled="loadingActivities"
                  :loading="loadingActivities"
                  v-bind="pagination"
                  @change="handlePaginationChange"
                  limit="3"
                  show-total
                  class="mb-4"
                />
              </b-col>
            </b-row>
          </div>
        </transition>
      </template>

        <transition name="fade" mode="out-in">
          <ex-loading v-if="loadingActivities"/>
          <ex-empty-state
            v-if="!loadingActivities && activities.length <= 0"
            message="No Results"
            icon="running"
            class="my-5"
          />
          <div v-if="!loadingActivities && activities.length > 0">
              <ex-activity-list-item
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :show-duration="false"
                show-resources
                editable
                @click.native="busEmit('activity-modal:start', activity)"
              />
            <b-row class="justify-content-center mt-5">
              <b-col cols="auto">
                <ex-pagination
                  :disabled="loadingActivities"
                  v-bind="pagination"
                  @change="handlePaginationChange"
                />
              </b-col>
            </b-row>
          </div>
        </transition>
        <ex-activity-modal id="activity-modal" />
    </ex-page>
    <ex-new-activity/>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ExPage from '~/components/Page'
import ExOrganizationSelect from '~/components/organizations/OrganizationSelect'
import ExActivityListItem from '~/components/recoveryPlan/ActivityListItem'
import ExActivityModal from '~/components/activities/ActivityModal/ActivityModal'
import ExNewActivity from '~/components/activities/new/NewActivity'
export default {
  name: 'page-activities',
  components: { ExActivityListItem, ExPage, ExOrganizationSelect, ExActivityModal, ExNewActivity },
  data: () => ({
    search: undefined,
    loadingOrganizations: true,
    loadingActivities: true,
    tabIndex: 0,
    organization: null,
    selectedOrganizations: [],
    activityTypes: [
      { label: 'Physical Activities', value: 'physical' },
      { label: 'Wellness Activities', value: 'wellness' },
      { label: 'Informational Activities', value: 'informational' },
      { label: 'Stretching Activities', value: 'stretching' },
      { label: 'Survey Activities', value: 'survey' },
    ],
    selectedActivityTypes: [],
    pageIndex: 1,
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', { authOrganizations: 'organizations' }),
    ...mapState('organizations', { allOrganizations: 'organizations' }),
    ...mapState('activities', ['activities', 'pagination']),
    ...mapState('activities/activity', ['activity']),
    organizations() {
      if (!this.user || !this.authOrganizations || !this.allOrganizations) return []
      if (this.isSysAdmin) return this.allOrganizations
      const DemoHealthOrg = this.allOrganizations.find(({ slug }) => slug === 'Demo_HEALTH')
      return [DemoHealthOrg, ...this.authOrganizations]
    },
  },
  async mounted() {
    this.subscribeToStore({
      'activities/activity/DELETE_FILE': {
        after: () => { this.getActivities() }
      }
    })
    if (!this.user) await this.fetchUser()
    this.selectedActivityTypes.push(this.activityTypes[0])
    await this.getOrganizations()
    await this.getActivities()
  },
  methods: {
    ...mapActions({ clearErrors: 'CLEAR_ERRORS' }),
    ...mapActions('activities', { fetchActivities: 'FETCH_ACTIVITIES' }),
    ...mapActions('auth', { fetchUser: 'FETCH_USER' }),
    ...mapActions('organizations', { fetchOrganizations: 'FETCH_ORGANIZATIONS' }),
    ...mapActions('activities/activity', { setActivity: 'SET_ACTIVITY' }),
    async getOrganizations() {
      this.loadingOrganizations = true
      await this.wait(this.fetchOrganizations, 750)
      this.selectedOrganizations = [this.organizations[0]]
      this.loadingOrganizations = false
    },
    async getActivities(search) {
      this.clearErrors()
      this.loadingActivities = true
      await this.wait(this.fetchActivities, 750, {
        ...this.pagination,
        page_index: this.pageIndex,
        types: this.selectedActivityTypes.map(({ value }) => value).toString(),
        // organizations: this.selectedOrganizations.map(({ id }) => id).toString(),
        search: this.search,
      })
      this.loadingActivities = false
    },
    handleOrganizationSelectChange(organization) {
      const selectedOrg = this.selectedOrganizations.find(({ id }) => id === organization.id)
      if (!selectedOrg) this.selectedOrganizations.push(organization)
      else this.selectedOrganizations = this.selectedOrganizations.filter(({ id }) => id !== organization.id)
      this.getActivities()
    },
    toggleActivityType(activityType) {
      const selectedActivityType = this.selectedActivityTypes.find(({ value }) => value === activityType.value);
      if (!selectedActivityType) this.selectedActivityTypes.push(activityType)
      else this.selectedActivityTypes = this.selectedActivityTypes.filter(({ value }) => value !== activityType.value)
      this.getActivities()
    },
    handlePaginationChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getActivities()
    },
    showActivityModal(activity) {
      this.setActivity(activity)
      this.$bvModal.show('activity-modal', activity)
    },
  },
}
</script>
