<template>
  <div class="Demo-app">
    <ex-page>
      <template slot="header">
        <h1 class="display-5 font-weight-light py-0 my-0">Recovery Plan Templates</h1>
      </template>

      <template slot="side-nav">
        <transition name="fade" mode="out-in">
          <ex-loading v-if="loadingRecoveryPlanTemplates"/>
          <div v-if="!loadingRecoveryPlanTemplates">
            <ex-button-select
              :disabled="loadingRecoveryPlanTemplates"
              :options="[{label: 'All Templates', value: 'all'}]"
              selected="all"
              button-class="w-100"
            />
            <hr/>
            <b-row class="justify-content-center mt-3">
              <b-col cols="auto">
                <ex-pagination
                  :disabled="loadingRecoveryPlanTemplates"
                  :loading="loadingRecoveryPlanTemplates"
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
          <ex-loading v-if="loadingRecoveryPlanTemplates"/>
          <ex-empty-state
            v-if="!loadingRecoveryPlanTemplates && recoveryPlanTemplates.length <= 0"
            message="No Results"
            icon="running"
            class="my-5"
          />
          <div v-if="!loadingRecoveryPlanTemplates && recoveryPlanTemplates.length > 0">
              <ex-recovery-plan-template-list-item
                v-for="template in recoveryPlanTemplates"
                :key="template.id"
                :template="template"
                :show-duration="false"
                show-resources
                editable
                @click.native="busEmit('recovery-plan-template-modal:start', template)"
              />
            <b-row class="justify-content-center mt-5">
              <b-col cols="auto">
                <ex-pagination
                  :disabled="loadingRecoveryPlanTemplates"
                  v-bind="pagination"
                  @change="handlePaginationChange"
                />
              </b-col>
            </b-row>
          </div>
        </transition>
        <ex-recovery-plan-template-modal/>
    </ex-page>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ExPage from '../../components/Page'
import ExOrganizationSelect from '../../components/organizations/OrganizationSelect'
import ExRecoveryPlanTemplateListItem from '../../components/recoveryPlanTemplates/RecoveryPlanTemplateListItem'
import ExRecoveryPlanTemplateModal from '../../components/recoveryPlanTemplates/RecoveryPlanTemplateModal/RecoveryPlanTemplateModal'

export default {
  name: 'page-recovery-plan-templates',
  components: {
    ExRecoveryPlanTemplateListItem,
    ExPage,
    ExOrganizationSelect,
    ExRecoveryPlanTemplateModal,
  },
  data: () => ({
    search: undefined,
    loadingOrganizations: true,
    loadingRecoveryPlanTemplates: true,
    tabIndex: 0,
    organization: null,
    selectedOrganizations: [],
    pageIndex: 1,
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', { authOrganizations: 'organizations' }),
    ...mapState('organizations', { allOrganizations: 'organizations' }),
    ...mapState('recoveryPlanTemplates', ['recoveryPlanTemplates', 'pagination']),
    ...mapState('recoveryPlanTemplates/recoveryPlanTemplate', ['recoveryPlanTemplate']),
    organizations() {
      if (!this.user || !this.authOrganizations || !this.allOrganizations) return []
      if (this.isSysAdmin) return this.allOrganizations
      const DemoHealthOrg = this.allOrganizations.find(({ slug }) => slug === 'Demo_HEALTH')
      return [DemoHealthOrg, ...this.authOrganizations]
    },
  },
  async mounted() {
    if (!this.user) await this.fetchUser()
    await this.getOrganizations()
    await this.getRecoveryPlanTemplates()
  },
  methods: {
    async getOrganizations() {
      this.loadingOrganizations = true
      await this.wait(this.fetchOrganizations, 750)
      this.selectedOrganizations = [this.organizations[0]]
      this.loadingOrganizations = false
    },

    async getRecoveryPlanTemplates() {
      this.clearErrors()
      this.loadingRecoveryPlanTemplates = true
      await this.wait(this.fetchRecoveryPlanTemplates, 750, {
        ...this.pagination,
        page_index: this.pageIndex,
        organizations: this.selectedOrganizations.map(({ id }) => id).toString(),
        search: this.search,
      })
      this.loadingRecoveryPlanTemplates = false
    },

    handleOrganizationSelectChange(organization) {
      const selectedOrg = this.selectedOrganizations.find(({ id }) => id === organization.id)
      if (!selectedOrg) this.selectedOrganizations.push(organization)
      else this.selectedOrganizations = this.selectedOrganizations.filter(({ id }) => id !== organization.id)
      this.getRecoveryPlanTemplates()
    },

    handlePaginationChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getRecoveryPlanTemplates()
    },

    ...mapActions({ clearErrors: 'CLEAR_ERRORS' }),
    ...mapActions('recoveryPlanTemplates', { fetchRecoveryPlanTemplates: 'FETCH_RECOVERY_PLAN_TEMPLATES' }),
    ...mapActions('auth', { fetchUser: 'FETCH_USER' }),
    ...mapActions('organizations', { fetchOrganizations: 'FETCH_ORGANIZATIONS' }),
    ...mapActions('recoveryPlanTemplates/recoveryPlanTemplate', { setRecoveryPlanTemplate: 'SET_RECOVERY_PLAN_TEMPLATE' }),
  },
}
</script>
