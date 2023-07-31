<template>
  <b-modal
    :id="id"
    modal-class="ex-new-user"
    hide-header
    hide-footer
  >
    <transition name="fade" mode="out-in">
      <ex-step-organization-details
        v-if="currentStep === 'organization-details'"
        @next="currentStep = 'organization-logo'"
      />
      <ex-step-organization-logo
        v-if="currentStep === 'organization-logo'"
        @back="currentStep = 'organization-details'"
        @next="currentStep = 'organization-confirm'"
      />
      <ex-step-organization-confirm
        v-if="currentStep === 'organization-confirm'"
        @back="currentStep = 'organization-logo'"
        @next="goToOrganizationPage"
        @skip="start"
      />
    </transition>
  </b-modal>
</template>
<script>
import ExStepOrganizationDetails from './steps/OrganizationDetails'
import ExStepOrganizationLogo from './steps/OrganizationLogo'
import ExStepOrganizationConfirm from './steps/OrganizationConfirm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ex-new-organization',
  components: {
    ExStepOrganizationDetails,
    ExStepOrganizationLogo,
    ExStepOrganizationConfirm,
  },
  data: () => ({
    currentStep: 'organization-details',
  }),
  props: {
    id: { type: String, default: 'new-organization' },
  },
  computed: {
    ...mapState('organization/new', ['organization']),
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('organization/new', { clearAll: 'CLEAR_ALL' }),
    start() {
      this.clearAll()
      this.currentStep = 'organization-details'
      this.$bvModal.show(this.id)
    },
    goToOrganizationPage() {
      this.$router.push({
        path: `/${this.unsluggify(this.organization.slug)}`
      })
      this.$bvModal.hide(this.id)
    }
  }
}
</script>
