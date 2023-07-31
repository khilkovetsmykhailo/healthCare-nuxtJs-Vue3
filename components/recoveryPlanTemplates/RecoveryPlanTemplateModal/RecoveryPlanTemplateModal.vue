<template>
<ex-modal
  id="recovery-plan-template-modal"
  size="lg"
  :no-close-on-backdrop="false"
  :title="recoveryPlanTitle"
>
  <ex-recovery-plan
    v-if="recoveryPlanTemplate.id !== null"
    :id="recoveryPlanTemplate.id"
  />

  <template slot="description" v-if="recoveryPlanTemplate.id">
  Viewing recovery plan template
  </template>
  <transition name="fade" mode="out-in">
    <ex-loading v-if="loading"/>
  </transition>
</ex-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import ExRecoveryPlan from '../../recoveryPlan/RecoveryPlan'

export default {
  name: 'ex-recovery-plan-template-modal',
  components: {
    ExRecoveryPlan,
  },
  data: () => ({
    editing: false,
    loading: true,
    initialPlanData: undefined,
  }),
  computed: {
    recoveryPlanTitle() {
      return this.recoveryPlanTemplate.id ? this.recoveryPlanTemplate.event_assignment.event.name : 'Recovery Plan'
    },

    ...mapState('recoveryPlanTemplates/recoveryPlanTemplate', ['recoveryPlanTemplate']),
  },
  mounted() {
    this.busOn('recovery-plan-template-modal:start', this.start)
  },
  methods: {
    ...mapActions('recoveryPlanTemplates/recoveryPlanTemplate', {
      setRecoveryPlanTemplate: 'SET_RECOVERY_PLAN_TEMPLATE',
      fetchRecoveryPlanTemplate: 'FETCH_RECOVERY_PLAN_TEMPLATE',
    }),
    start(recoveryPlanTemplate) {
      this.loading = true
      this.editing = false
      this.$bvModal.show('recovery-plan-template-modal')
      this.initialPlanData = recoveryPlanTemplate
      this.getRecoveryPlanTemplate()
    },
    async getRecoveryPlanTemplate() {
      this.loading = true
      await this.wait(this.fetchRecoveryPlanTemplate, 750, this.initialPlanData.id)
      this.loading = false
    },
  }
}
</script>
