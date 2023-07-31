<template>
  <ex-step
    :title="`${activity.type} Activity Details`"
    description="Please complete the required fields below."
    :next-step-disabled="false"
    @back="$emit('back')"
    :has-next-step="false"
    :error="error"
    :loading="loading"
  >

    <transition name="fade" mode="out-in">

      <ex-loading
        v-if="loading"
        message="Creating Activity"
      />

      <ex-editable-activity-details
        v-if="!loading"
        :submit-text="activity.id ? 'Next' : 'Create Activity'"
        @change="handleChange"
        disable-type
        hide-reset
      />

    </transition>
  </ex-step>
</template>
<script>
import ExEditableActivityDetails from '../../editable/EditableActivityDetails'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ex-step-activity-details',
  components: { ExEditableActivityDetails },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('activities/activity', ['activity', 'error']),
    ...mapState('auth', ['user']),

    isNew() {
      return !this.activity.id
    }
  },
  methods: {
    ...mapActions('activities/activity', {
      createActivity: 'CREATE_ACTIVITY',
      updateActivityState: 'UPDATE_ACTIVITY_STATE',
      updateActivity: 'UPDATE_ACTIVITY',
    }),
    async handleChange(activityState) {
      this.loading = true
      // this.updateActivityState({
      //   ...activityState,
      //   owner_type: 'users',
      //   owner_id: this.user.id,
      // })
      const operation = this.activity.id ? this.updateActivity : this.createActivity
      await this.wait(operation, 1000, this.activity)
      if (!this.error && this.activity.id) this.$emit('next')
      this.loading = false
    }
  },
}
</script>
