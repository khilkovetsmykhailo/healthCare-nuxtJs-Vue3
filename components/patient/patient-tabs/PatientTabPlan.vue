<template>
  <div class="ex-patient-tab ex-patient-tab-plan">
    <ex-recovery-plan
      v-if="recoveryPlan !== null"
      :id="recoveryPlan.id"
      can-edit
    />

    <b-alert
      v-if="recoveryPlan === null"
      show
      variant="danger"
    >
      Could not load recovery plan. Please try again later.
    </b-alert>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ExRecoveryPlan from '../../recoveryPlan/RecoveryPlan'

export default {
  name: 'patient-tab-plan',
  components: {
    ExRecoveryPlan,
  },
  computed: {
    ...mapGetters('organization/patient', ['recoveryPlan']),
  },
}
</script>
