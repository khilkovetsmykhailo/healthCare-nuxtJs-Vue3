<template>
  <ex-step
    title="Confirm Details"
    description="Please complete the required fields below."
    :next-step-disabled="false"
    @back="$emit('back')"
    @submit="$emit('next')"
    :has-next-step="false"
  >
    CONFIRM DETAILS BITCHHHHH
  </ex-step>
</template>
<script>
import ExEditableActivityDetails from '../../editable/EditableActivityDetails'
import { mapState } from 'vuex'
export default {
  name: 'ex-step-activity-confirm',
  components: { ExEditableActivityDetails },
  computed: {
    ...mapState('activities/activity', ['activity'])
  },
}
</script>
