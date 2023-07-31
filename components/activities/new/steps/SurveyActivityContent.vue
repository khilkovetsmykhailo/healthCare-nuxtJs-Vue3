<template>
  <ex-step
    title="Survey Questions"
    description="Please complete the required fields below."
    @back="$emit('back')"
    @submit="$emit('next')"
    @skip="$emit('skip')"
    :loading="loading"
    :error="error"
  >

    <transition name="fade" mode="out-in">

      <ex-loading v-if="loading"/>

      <div v-if="!loading">

        survey content here

        <!-- <ex-editable-survey-details
          v-if="!loading"
          hide-reset
          buttonSize="lg"
          @change="handleChange"
          submit-text="Next Step"
        /> -->

      </div>

    </transition>
  </ex-step>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ExEditableActivityFiles from '../../editable/EditableActivityFiles'
import ExEditableSurveyDetails from '../../../surveys/editable/EditableSurveyDetails'
export default {
  name: 'ex-step-survey-activity-content',
  components: { ExEditableActivityFiles, ExEditableSurveyDetails },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/survey', ['survey', 'error']),
  },
  methods: {
    ...mapActions('activities/activity', {
      updateActivity: 'UPDATE_ACTIVITY',
    }),
    ...mapActions('activities/activity/survey', {
      createSurvey: 'CREATE_SURVEY',
      updateSurvey: 'UPDATE_SURVEY',
    }),
    async handleChange(surveyState) {
      this.loading = true
      const operation = surveyState.id ? this.updateSurvey : this.createSurvey
      await this.wait(operation, 750, surveyState)
      if (!surveyState.parent_id) await this.updateActivity({
        id: this.activity.id,
        parent_type: 'surveys',
        parent_id: this.survey.id,
      })
      if (!this.error && this.survey.id) this.$emit('next')
      this.loading = false
    }
  }
}
</script>
